
	//构建场景
	var scene = viewer.scene;
	var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
	var labelEntity = viewer.entities.add({
		label : {
			show : false,
			showBackground : true,
			backgroundColor : new Cesium.Color(0.165, 0.165, 0.165, 0.8),
			font : '24px monospace',
			horizontalOrigin : Cesium.HorizontalOrigin.LEFT,
			verticalOrigin : Cesium.VerticalOrigin.TOP,
			pixelOffset : new Cesium.Cartesian2(15, 0)
		}
	});
	// Example 1:  Add a label, specifying all the default values.
	/**var l = labels.add({
	  show : true,
	  position : Cesium.Cartesian3.ZERO,
	  text : '',
	  font : '30px sans-serif',
	  fillColor : Cesium.Color.WHITE,
	  outlineColor : Cesium.Color.BLACK,
	  outlineWidth : 1.0,
	  showBackground : false,
	  backgroundColor : new Cesium.Color(0.165, 0.165, 0.165, 0.8),
	  backgroundPadding : new Cesium.Cartesian2(7, 5),
	  style : Cesium.LabelStyle.FILL,
	  pixelOffset : Cesium.Cartesian2.ZERO,
	  eyeOffset : Cesium.Cartesian3.ZERO,
	  horizontalOrigin : Cesium.HorizontalOrigin.LEFT,
	  verticalOrigin : Cesium.VerticalOrigin.BASELINE,
	  scale : 1.0,
	  translucencyByDistance : undefined,
	  pixelOffsetScaleByDistance : undefined,
	  heightReference : HeightReference.NONE,
	  distanceDisplayCondition : undefined
	});**/

	// 鼠标移入labelEntity提示框
	handler.setInputAction(function(movement) {

		var foundPosition = false;

		if (scene.mode !== Cesium.SceneMode.MORPHING) {
			var pickedObject = scene.pick(movement.endPosition);
			if (scene.pickPositionSupported && Cesium.defined(pickedObject) && pickedObject.id !== '') {
				var cartesian = viewer.scene.pickPosition(movement.endPosition);

				if (Cesium.defined(cartesian)) {
					var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
					labelEntity.position = cartesian;
					labelEntity.label.show = true;
					var name = '';
					if(pickedObject.id){
						name = pickedObject.id._name;
					} else {
						name = '建筑物';
					}
					labelEntity.label.text =
						'地区: ' + name;//pickedObject.id._name;

					labelEntity.label.eyeOffset = new Cesium.Cartesian3(0.0, 0.0, -cartographic.height * (scene.mode === Cesium.SceneMode.SCENE2D ? 1.5 : 1.0));

					foundPosition = true;
				}
			}
		}

		if (!foundPosition) {
			labelEntity.label.show = false;
		}
	}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

	
	/**
	// 选中某个区域
	// HTML overlay for showing feature name on mouseover
	var nameOverlay = document.createElement('div');
	viewer.container.appendChild(nameOverlay);
	nameOverlay.className = 'backdrop';
	nameOverlay.style.display = 'none';
	nameOverlay.style.position = 'absolute';
	nameOverlay.style.bottom = '0';
	nameOverlay.style.left = '0';
	nameOverlay.style['pointer-events'] = 'none';
	nameOverlay.style.padding = '4px';
	nameOverlay.style.backgroundColor = 'black';

	// Information about the currently selected feature
	var selected = {
		feature: undefined,
		originalColor: new Cesium.Color()
	};

	// An entity object which will hold info about the currently selected feature for infobox display
	var selectedEntity = new Cesium.Entity();

	// Get default left click handler for when a feature is not picked on left click
	var clickHandler = viewer.screenSpaceEventHandler.getInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
	if (Cesium.PostProcessStageLibrary.isSilhouetteSupported(viewer.scene)) {
		console.log('isSilhouetteSupported is ' + true);
	} else {
		console.log('isSilhouetteSupported is ' + false);
	}
	if (Cesium.PostProcessStageLibrary.isSilhouetteSupported(viewer.scene)) {
    // Silhouettes are supported
    var silhouetteBlue = Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
    silhouetteBlue.uniforms.color = Cesium.Color.BLUE;
    silhouetteBlue.uniforms.length = 0.01;
    silhouetteBlue.selected = [];

    var silhouetteGreen = Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
    silhouetteGreen.uniforms.color = Cesium.Color.LIME;
    silhouetteGreen.uniforms.length = 0.01;
    silhouetteGreen.selected = [];

    viewer.scene.postProcessStages.add(Cesium.PostProcessStageLibrary.createSilhouetteStage([silhouetteBlue, silhouetteGreen]));

    // Silhouette a feature blue on hover.
    viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
		console.log('movement: ' + movement);
        // If a feature was previously highlighted, undo the highlight
        silhouetteBlue.selected = [];

        // Pick a new feature
        var pickedFeature = viewer.scene.pick(movement.endPosition);
        if (!Cesium.defined(pickedFeature)) {
            nameOverlay.style.display = 'none';
            return;
        }

        // A feature was picked, so show it's overlay content
        nameOverlay.style.display = 'block';
        nameOverlay.style.bottom = viewer.canvas.clientHeight - movement.endPosition.y + 'px';
        nameOverlay.style.left = movement.endPosition.x + 'px';
		nameOverlay.textContent = 'mydemo';

        // Highlight the feature if it's not already selected.
        if (pickedFeature !== selected.feature) {
            silhouetteBlue.selected = [pickedFeature];
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    // Silhouette a feature on selection and show metadata in the InfoBox.
    viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
        // If a feature was previously selected, undo the highlight
        silhouetteGreen.selected = [];

        // Pick a new feature
        var pickedFeature = viewer.scene.pick(movement.position);
        if (!Cesium.defined(pickedFeature)) {
            clickHandler(movement);
            return;
        }

        // Select the feature if it's not already selected
        if (silhouetteGreen.selected[0] === pickedFeature) {
            return;
        }

        // Save the selected feature's original color
        var highlightedFeature = silhouetteBlue.selected[0];
        if (pickedFeature === highlightedFeature) {
            silhouetteBlue.selected = [];
        }

        // Highlight newly selected feature
        silhouetteGreen.selected = [pickedFeature];

        // Set feature infobox description
		/**
        var featureName = pickedFeature.getProperty('name');
        selectedEntity.name = featureName;
        selectedEntity.description = 'Loading <div class="cesium-infoBox-loading"></div>';
        viewer.selectedEntity = selectedEntity;
        selectedEntity.description = '<table class="cesium-infoBox-defaultTable"><tbody>' +
                                     '<tr><th>BIN</th><td>' + pickedFeature.getProperty('BIN') + '</td></tr>' +
                                     '<tr><th>DOITT ID</th><td>' + pickedFeature.getProperty('DOITT_ID') + '</td></tr>' +
                                     '<tr><th>SOURCE ID</th><td>' + pickedFeature.getProperty('SOURCE_ID') + '</td></tr>' +
                                     '</tbody></table>';
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}**/