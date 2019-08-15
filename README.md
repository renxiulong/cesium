# cesium_wiki
Cesium study

cesium是跨平台、跨浏览器的javascript库，类似于three.js库一样，底层也是使用的webGL，因此需要浏览器必须支持webGL

1. 生成目录cesium-test文件夹
2. 将Cesium-1.60资源下的Build文件夹拷贝到cesium-test目录下
3. 将Cesium-1.60资源下的Apps文件夹下的HelloWorld.html拷贝到cesium-test目录下
4. 将HelloWorld.html中的build文件引用修改为本地目录将../删除
5. 发布工程，定位到cesium-test目录，然后命令php -S localhost:4111(端口随便)
6. 地址栏输入http://localhost:4111/HelloWorld.html就可以访问最简单的例子了

git操作
1. 初始化
> git init
2. 添加文件
> git add filename
3. 提交文件
> git commit -m "注释内容"
4. 关联远程仓库(第一次使用,后面的wangjiax9/practice.git是在github上建立的仓库)
> git remote add origin git@github.com:wangjiax9/practice.git
5. 将本地库内容推送到远程库上(第一次需要-u参数，以后可以不要此参数)
> git push -u origin master

git分支操作
1. 查看分支:git branch
2. 创建分支：git branch <name>
3. 切换分支：git checkout <name>
4. 创建+切换分支：git checkout -b <name>
5. 合并某分支到当前分支：git merge <name>
6. 删除分支：git branch -d <name>
this is a last line.