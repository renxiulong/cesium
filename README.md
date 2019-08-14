# cesium_wiki
Cesium study

cesium是跨平台、跨浏览器的javascript库，类似于three.js库一样，底层也是使用的webGL，因此需要浏览器必须支持webGL

1. 生成目录cesium-test文件夹
2. 将Cesium-1.60资源下的Build文件夹拷贝到cesium-test目录下
3. 将Cesium-1.60资源下的Apps文件夹下的HelloWorld.html拷贝到cesium-test目录下
4. 将HelloWorld.html中的build文件引用修改为本地目录将../删除
5. 发布工程，定位到cesium-test目录，然后命令php -S localhost:4111(端口随便)
6. 地址栏输入http://localhost:4111/HelloWorld.html就可以访问最简单的例子了