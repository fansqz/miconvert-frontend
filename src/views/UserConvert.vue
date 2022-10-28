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
  {{ fileList }}
  <el-table :data="fileList" height="250" stripe>
    <el-table-column prop="fileName"></el-table-column>
    <el-table-column prop="fileSize" ></el-table-column>
    <!--下载按钮，或状态-->
    <el-table-column>
      <template v-slot="{row}">
        <el-button size="small"
        :type="getButtonTypeByState(row.state)"
        :disabled="(row.state === 2 || row.state === 0)"
        @click="downloadFile(row.id)"
        >
        {{ getButtonTextByState(row.state) }}
        </el-button>
      </template>
    </el-table-column>
    <!--删除按钮-->
    <el-table-column>
      <template v-slot="{row}">
        <el-button size="small"
        type = 'danger'
        v-if="row.state === 1 || row.state === 2"
        @click="deleteFile(row.id)"
        >
        删除
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
import userConvert from '../service/api/userconvert';
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

// 获取用户当前文件
const getUserFiles = async () => {
  const res = await userConvert.listFile();
  fileList.value = res.data;
};

const getButtonTextByState = (state) => {
  if (state === 2) {
    return '失败';
  } if (state === 1) {
    return '下载';
  }
  return '转换中';
};

const getButtonTypeByState = (state) => {
  if (state === 2) {
    return 'danger';
  }
  return 'success';
};

// 上传并转换文件
const convertFile = async (params) => {
  // 验证数据是否合格
  const fd = new FormData();
  fd.append('file', params.file);
  fd.append('outFormat', outFormat.value);
  // 添加文件
  const res = await userConvert.convertFile(fd);
  if (res.code === 200) {
    // 再次读取用户文件
    const res2 = await userConvert.listFile();
    fileList.value = res2.data;
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
const downloadFile = (fileId) => {
  const url = userConvert.getDownloadUrl(fileId);
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

// 删除文件
const deleteFile = async (fileId) => {
  const res = await userConvert.deleteFiles([fileId]);
  if (res.data === 200) {
    ElMessage.success(res.message);
  }
  // 更新文件列表
  getUserFiles();
};

// 进入页面时就获取pfd支持的inFormat
getInFormatsByOutFormats();
// 获取用户原本文件列表
getUserFiles();
</script>

<style scoped>
#parseFile {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
</style>
