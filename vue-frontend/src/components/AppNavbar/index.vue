<script>
import menuList from "@/config/menuConfig.js";
import memoryUtils from "../../utils/memoryUtils";
export default {
  data() {
    return {
      menuNodes: "",
    };
  },
  mounted() {
    this.menuNodes = this.getMenuNodes(menuList);
  },
  components: {},
  render() {
    return (
      <div class="navbar">
        <el-menu
          router={true}
          default-active={this.$route.path}
          default-openeds={["/students"]}
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          {this.menuNodes}
        </el-menu>
      </div>
    );
  },
  methods: {
    hasAuth(item) {
      const { index, isPublic } = item;
      const menus = memoryUtils.user.role.menus;
      // console.log(memoryUtils);
      // console.log(menus);
      const username = memoryUtils.user.username;
      //  如果当前用户admin  =》全部通过
      //  如果当前item是公开的
      //  当前用户有此item的权限  index是否在menus中
      if (username == "admin" || isPublic || menus.indexOf(index) !== -1) {
        return true;
      } else if (item.children) {
        //如果当前用户有此item的某个子item权限
        //查看当前item的子节点中的index时候在用户权限列表中存在，find方法会返回对应的元素，但是需要的是布尔值所以两次取反强制转换
        return !!item.children.find(
          (child) => menus.indexOf(child.index) !== -1
        );
      }
      return false;
    },
    getMenuNodes(menuList) {
      return menuList.map((item) => {
        if (this.hasAuth(item)) {
          if (!item.children) {
            return (
              <el-menu-item index={item.index}>
                <i class={item.icon}></i>
                <span slot="title">{item.title}</span>
              </el-menu-item>
            );
          } else {
            return (
              <el-submenu index={item.index}>
                <template slot="title">
                  <i class={item.icon}></i>
                  <span>{item.title}</span>
                </template>
                {this.getMenuNodes(item.children)}
              </el-submenu>
            );
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.navbar {
  position: absolute;
  width: 230px;
  top: 50px;
  left: 0px;
  bottom: 0px;
  overflow-y: auto;
  background-color: #545c64;
}
</style>