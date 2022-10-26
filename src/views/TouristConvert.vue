<template>
  <div id="parseFile">
  <!--上传列表-->
  <el-upload
    class="upload-demo"
    drag
    :before-upload="beforeUpload"
    :http-request="convertFile"
    :on-remove="handleRemove"
    :show-file-list="false"
    style="width: 100%"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
        将文件拖到此处，<em>或点击上传</em><br/>
        仅支持{{inFormatsString}}转换为{{outFormat}}
    </div>
    <!--下拉框-->
    <template #tip>
      <el-form-item label="目标类型：">
        <el-select v-model="outFormat" @click="getOutFormats()"
        @change="getInFormatsByOutFormats()">
          <el-option v-for="(item,index) in outFormats"
          :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
    </el-form-item>
    </template>
  </el-upload><br/>
  <!--文件列表-->
  <el-table :data="fileList"  stripe style="width: 100%">
    <el-table-column prop="name" width="150"></el-table-column>
    <el-table-column prop="size" width="150"></el-table-column>
    <el-table-column width="70px">
        <template v-slot="{row}">
            <el-button size="small" :type="row.buttonType"
            :text="row.buttonText" :disabled="row.disabled"
            @click="downloadFile()"
            >
            {{ row.buttonText }}
            </el-button>
        </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import convert from '../service/api/convert';
import { filterSize } from '../utils/fileutils';
// 文件列表
const fileList = ref([]);
// 选择的格式
const outFormat = ref('pdf');
// 可选的格式
const outFormats = ref([]);
// 可输入格式
const inFormats = ref([]);

const inFormatsString = ref();

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
  fd.append('outFormat', outFormat.value);
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
      url: convert.getDowloadUrl(res.data),
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
const getOutFormats = async () => {
  const res = await convert.listAllOutFormat();
  outFormats.value = res.data;
};

// 根据目标格式获取输入格式
const getInFormatsByOutFormats = async () => {
  const res = await convert.listAllInFormatByOutFormat({ outFormat: outFormat.value });
  // 设置各种属性
  inFormats.value = res.data;
  inFormatsString.value = inFormats.value.toString();
};

// 下载文件
const downloadFile = () => '';

// 进入页面时就获取pfd支持的inFormat
getInFormatsByOutFormats();
</script>

<style>
#parseFile {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
</style>
