###  vue难点
#   1  动态渲染导航
#
#   2  设置角色权限 丢失数据    难点 问题；  原因 ：
#     Auth.vue
#      if (this.checkedKeys.indexOf(data.index) != -1) {
#          this.checkedKeys.splice(this.checkedKeys.indexOf(data.index), 1);
#       }
#   3   某页数据归0  显示不了其他数据   bug   判断 //
#      if(this.currentPage > Math.ceil(this.totalPage)){
#       this.currentPage = Math.ceil(this.totalPage)
#     }
#   专业管理和学校管理一样
#
#   4   学员模块  314行 问题
#      if(resTeacher._id){
#            this.searchMap.teacher_id=resTeacher._id
#            //如果输入了教师名称（不存在的）就赋值为-1 防止后端查询时返回所有数据
#        }else if(this.search.teacher){
#            this.searchMap.teacher_id='-1'
#       }else{
#           this.searchMap.teacher_id=""
#       };
#   5   添加学员中 激活即列出输入建议的 专业和学校无法自动出现
#   返回的school option中缺少value属性  在获取学校专业列表中加一个for循环遍历出value
#                                   或者在标签中加入  value-key=“schoolname”
#   6  添加学员删除图片只能点击第二个只能删除第一个 在删除第二个包错
#        this.fileList.splice(this.fileList.indexOf(file.name), 1); name删掉