<template>
  <el-upload
            class="upload-demo"
            drag
            accept=".pdf,.doc,.docx,.png,.jpg"
            :before-upload="beforeUpload"
            :http-request="convertFile"
            :on-remove="handleRemove"
            :show-file-list="false"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                将文件拖到此处，<em>或点击上传</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    只支持pdf、doc、docx、png、jpg
                </div>
            </template>
  </el-upload>
  <el-table :data="fileList" border stripe style="width: 100%">
          <el-table-column prop="name" label="文件名称"></el-table-column>
          <el-table-column width="80px">
              <template v-slot="{row}">
                  <el-button size="small" type="text">
                      <a :href="row.url">下载</a>
                  </el-button>
              </template>
          </el-table-column>
          <el-table-column width="80px" v-if="isShowDel">
              <template v-slot="scope">
                  <el-button size="small" type="text" @click="deleteButton(scope.$index)">删除
                  </el-button>
              </template>
          </el-table-column>
      </el-table>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { ref, nextTick } from 'vue';
import convert from '../service/api/convert';

const fileList = ref([]);

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
  fd.append('outFormat', 'pdf');
  // 添加文件并记录位置
  const index = fileList.value.length;
  fileList.value.push({
    name: params.file.name,
    url: '',
  });
  // 解析文件获取结果
  const res = await convert.convertFile(fd);
  // 读取件名称
  const filename = res.data.substring(res.data.indexOf('_') + 1);
  fileList.value[index].name = filename;
  fileList.value[index].url = `${convert.getDowloadBeginUrl()}/${res.data}`;
  await nextTick();
};

</script>

<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
