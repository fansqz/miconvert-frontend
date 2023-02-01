<template>
  <div id="parseFile">
  <!--上传-->
  <p class="convert_text1">文件转换器</p>
  <p class="convert_text2">支持多种格式转换</p><br/><br/>
  <div class="upload">
    <el-upload class="upload_from"
      drag
      :before-upload="beforeUpload"
      :http-request="convertFile"
      :on-remove="handleRemove"
      :show-file-list="false"
    >
      <img class="upload_img" src="/public/upload.ico"/>
      <div class="el-upload__text" >
          将文件拖到此处，<em>或点击上传</em><br/>
          仅支持{{inputFormatsString}}转换为{{outputFormat}}
      </div>
    </el-upload>
  </div><br/>
  <!--下拉框-->
  <el-form-item label="目标类型：" class="outformat_select">
    <el-select v-model="outputFormat" @click="getOutputFormats()"
    @change="getInFormatsByOutFormats()">
      <el-option v-for="(item,index) in outputFormats"
      :key="index" :label="item" :value="item">
      </el-option>
    </el-select>
  </el-form-item>
  </div>
  <!--文件列表-->
  <el-table :data="fileList"  class = "file_list" :show-header="false" stripe>
    <el-table-column prop="name"></el-table-column>
    <el-table-column prop="size" ></el-table-column>
    <el-table-column>
        <template v-slot="{row}">
            <el-button size="small" :type="row.buttonType"
            :disabled="row.disabled"
            @click="downloadFile(row.filename)"
            >
            {{ row.buttonText }}
            </el-button>
        </template>
    </el-table-column>
  </el-table>
    <!--底部蓝条-->
  <div class="footer"></div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import convert from '../service/api/convert';
import { filterSize } from '../utils/fileutils';
// 文件列表
const fileList = ref([]);
// 选择的格式
const outputFormat = ref('pdf');
// 可选的格式
const outputFormats = ref([]);
// 可输入格式
const inputFormats = ref([]);

const inputFormatsString = ref();

// 添加文件并校验
const beforeUpload = (file) => {
  // 检验
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    ElMessage.error('上传图片大小不能超过 10MB！');
    return false;
  }
  return true;
};

// 上传并转换文件
const convertFile = async (params) => {
  // 验证数据是否合格
  const fd = new FormData();
  fd.append('file', params.file);
  fd.append('outputFormat', outputFormat.value);
  // 添加文件并记录位置
  const index = fileList.value.length;
  fileList.value.push({
    name: params.file.name,
    size: filterSize(params.file.size),
    url: '',
    buttonText: '解析中',
  });
  // 解析文件获取结果
  try {
    const res = await convert.convertFile(fd);
    // 读取件名称
    const filename = res.data.substring(res.data.indexOf('_') + 1);
    // 解析成功，按钮格式转换
    fileList.value[index] = {
      name: filename,
      filename: res.data,
      size: fileList.value[index].size,
      buttonType: 'success',
      buttonText: '下载',
      disabled: false,
    };
  } catch {
    // 有异常下载失败
    fileList.value[index] = {
      name: fileList.value[index].name,
      url: '',
      size: fileList.value[index].size,
      buttonType: 'danger',
      buttonText: '失败',
      disabled: true,
    };
  }
};

// 获取输出格式
const getOutputFormats = async () => {
  const res = await convert.listAllOutputFormat();
  outputFormats.value = res.data;
};

// 根据目标格式获取输入格式
const getInFormatsByOutFormats = async () => {
  const res = await convert.listAllInputFormatByOutputFormat({ format: outputFormat.value });
  // 设置各种属性
  inputFormats.value = res.data;
  inputFormatsString.value = inputFormats.value.toString();
};

// 下载文件
const downloadFile = async (filename) => {
  const url = await convert.getDowloadUrl(filename);
  const form = document.createElement('form');
  form.style.display = 'none';
  form.setAttribute('target', '_blank');
  form.setAttribute('method', 'get');
  form.setAttribute('action', url);
  const input = document.createElement('input');
  input.setAttribute('type', 'hidden');
  form.appendChild(input);
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

// 进入页面时就获取pfd支持的inFormat
getInFormatsByOutFormats();
</script>

<style scoped>

.convert_text1 {
  font-size:large;
  font-style: italic;
  font-weight:900;
  text-align: center;
  color: #c32e2e;
}
.convert_text2 {
  font-size:medium;
  font-style: italic;
  font-weight:100;
  text-align: center;
  color: #292626;
}
#parseFile {
  position: absolute;
  left: 50%;
  top: 35%;
  transform: translate(-50%,-50%);
}

.file_list {
  position: absolute;
  top: 60%;
  left: 28%;
  width: 45%;
  height: 30%;
}

.upload {
  width: 100%;
  height: 100%;
  box-shadow: 0 0 15px rgb(175, 175, 179);
}

.upload_img {
  opacity: 0.2;
  width: 25%;
  height: 25%;
}

.footer {
  left: 0%;
  width: 100%;
  height: 10%;
  position: absolute;
  bottom: 0;
  background-color: #569df4;
}
</style>
