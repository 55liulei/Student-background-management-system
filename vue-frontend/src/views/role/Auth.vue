<template>
  <div>
    <el-form
      status-icon
      ref="roleForm"
      :model="updateRole"
      label-width="100px"
      label-position="right"
      style="width: 400px"
      :rules="rules"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="updateRole.name" placeholder="请输入角色名称" />
      </el-form-item>
    </el-form>
    <el-tree
      :data="authList"
      show-checkbox
      node-key="index"
      :default-expand-all="true"
      :default-checked-keys="checkedKeys"
      @check-change="handleCheckChange"
      ref="tree"
    >
    </el-tree>
  </div>
</template>

<script>
import menuList from "@/config/menuConfig.js";
export default {
  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: ["blur", "change"],
          },
        ],
      },
      updateRole: {}, //要修改后的角色对象
      authList: [], //权限列表
      checkedKeys: [], //树形空件选中项数组
    };
  },
  props: ["role"],
  mounted() {
    this.updateRole = { ...this.role };
    this.authList = this.getAuthNodes(menuList);
    this.checkedKeys = this.role.menus;
  },
  watch: {
    role(val) {
      if (val) {
        this.$nextTick(() => {
          this.updateRole = { ...val };
          this.checkedKeys = val.menus;
          this.$refs["tree"].setCheckedKeys(this.checkedKeys);
        });
      }
    },
  },
  components: {},

  methods: {
    getAuthNodes(menuList) {
      return menuList.map((item) => {
        if (!item.children) {
          return {
            index: item.index,
            label: item.title,
          };
        } else {
          return {
            index: item.index,
            label: item.title,
            children: this.getAuthNodes(item.children),
          };
        }
      });
    },
    //树形空间节点 点击回调
    // data 当前点击节点数据  checked  节点是否被选中  indetermainate 当前节点的子节点是否有选中状态
    handleCheckChange(data, checked, indeterminate) {
      if (checked) {
        this.checkedKeys.push(data.index);
        let set = new Set(this.checkedKeys);
        this.checkedKeys = Array.from(set);
      } else {
        if (this.checkedKeys.indexOf(data.index) != -1) {
          this.checkedKeys.splice(this.checkedKeys.indexOf(data.index), 1);
        }
      }
    },
    getMenus() {
      this.updateRole.menus = this.checkedKeys;
      return this.updateRole;
    },
  },
};
</script>

<style scoped>
</style>