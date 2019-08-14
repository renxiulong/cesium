# cesium_wiki
Cesium study

cesium是跨平台、跨浏览器的javascript库，类似于three.js库一样，底层也是使用的webGL，因此需要浏览器必须支持webGL

**第一步:生成目录cesium-test文件夹**
**第二步:将Cesium-1.60资源下的Build文件夹拷贝到cesium-test目录下**
**第三步:将Cesium-1.60资源下的Apps文件夹下的HelloWorld.html拷贝到cesium-test目录下**
**第四步:将HelloWorld.html中的build文件引用修改为本地目录将../删除**
**第五步:发布工程，定位到cesium-test目录，然后命令php -S localhost:4111(端口随便)**
**第六步:地址栏输入http://localhost:4111/HelloWorld.html就可以访问最简单的例子了**