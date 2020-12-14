export default function LJyosetuMap() {
    this.map = null;
    this.carMarkers = [];
    this.spotMarkers = [];
    this.trackingLines = [];
    this.areaPolygon = [];
    this.mySpotMerker = null;
    this.areaSpotMarkers = [];
    this.lineColors = [
        "#ff0000", // 30分以内 => 赤
        "#0054a7", // 60分以内 => 青
        "#8ec31f", // 90分以内 => 緑
        "#808080" // 90分以上 => グレー
    ];
    this.lineWidths = [
        8,  // 30分以内 => 太い
        6,  // 60分以内 => 普通
        6,  // 90分以内 => 普通
        3   // 90分以上 => 細い
    ];
    this.carIcons = {};
    this.cameraIcon = '/img/camera.png';
    this.shareCarIds = []; // 連携車両のID一覧
    this.shareCarIconPath = null; // 連携車両のアイコンパス
}

LJyosetuMap.prototype = {
    /**
     * マップを作成する
     * @param {string} id マップを配置するタグのID
     * @param {Array}lonlat マップの中心の経度・緯度
     */
    create: function (id, lonlat, options) {

        var t_pale = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
            attribution: "<a href='https://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>"
        });
        var baseGSI = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
            attribution: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>"
        });
        var o_std = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        });

        var Map_BaseLayer = {
            "OpenStreetMap 標準": o_std,
            "地理院地図 淡色": t_pale,
            "地理院地図 航空写真": baseGSI
        };

        this.map = L.map(id, {
            center: [lonlat[1], lonlat[0]],
            zoom: 14,
            zoomControl: true,
            layers: [o_std]
        });

        L.control.scale({
            imperial: false,
            maxWidth: 300
        }).addTo(this.map);

	if (options['switch_map']) {
            L.control.layers(Map_BaseLayer, null, {
        collapsed: true,
        position: "topleft"
            }).addTo(this.map);
	}
    },

    /**
     * 走行ラインを追加する
     * @param {string} geojson 走行データのGeoJSON
     */
    addTracking: function (geojson, options) {
        if (geojson === "") return;

        var self = this;
        var car_name = null;
        var car_type = null;
        var status = null;
        var group = null;

        var layers = L.geoJSON(geojson.features, {
            style:
                function (feature) {
                    return {
                        color: self.lineColors[feature.properties.kubun],
                        weight: self.lineWidths[feature.properties.kubun],
                        opacity: 0.8
                    };
                },
            pointToLayer: function (feature, latlng) {
		        icon_url = feature.properties.file_path;
		        // 連携車両の場合、標準のアイコンを設定
		        if ($.inArray(feature.properties.car_id, self.shareCarIds) >= 0) {
			      icon_url = self.shareCarIconPath;
		         }
                    var icon = L.icon({
                        iconUrl: icon_url,
                        iconSize: [32, 32],
                        iconAnchor: [16, 32],   // アイコンの左上隅が[0, 0]
                        popupAnchor: [0, -32]   // latlngからのオフセット
                    });
		        if (options['popup_of_min']) {
			        var description = '';
			        if (feature.properties.sub_name) {
			            description = escapeHTML(feature.properties.sub_name.trim()) + '<br>' +
			        	escapeHTML(feature.properties.car_name.trim()) + '<br>';
			        } else {
			            description = escapeHTML(feature.properties.car_name.trim()) + '<br>';
                    }
                    
                    if (feature.properties.car_radio_no) {
                      description += escapeHTML(feature.properties.car_radio_no.trim());
                    }
	   	        } else {
			    var description = escapeHTML(feature.properties.customer_name.trim()) + '<br>' +
                            escapeHTML(feature.properties.car_type.trim()) + '<br>' +
                            escapeHTML(feature.properties.car_name.trim()) + '<br>' +
                            escapeHTML(feature.properties.date_time.trim());
		        }
                var layer = L.marker(latlng, {icon: icon}).bindPopup(description);
		        if (options['mouseover']) {
			        layer.on('mouseover', function() { layer.openPopup(); }); // マウスオーバー
			        layer.on('mouseout', function() { layer.closePopup(); }); // マウスアウト
		        }
                    car_name = feature.properties.car_name;
                    car_type = feature.properties.car_type;
                    sub_name = feature.properties.sub_name;
                    status = feature.properties.status;
                    group = feature.properties.group;
                    self.carMarkers.push({
                        car_name: car_name,
                        car_type: car_type,
                        sub_name: sub_name,
                        status: status,
                        group: group,
                        layer: layer
                    });
                    return layer;
            },
	        onEachFeature: function (feature, layer) {
                if (feature.desc) {
                    var line_desc = escapeHTML(feature.desc.customer_name.trim()) + '<br>' +
                        escapeHTML(feature.desc.car_type.trim()) + '<br>' +
                        escapeHTML(feature.desc.car_name.trim()) + '<br>' +
                        escapeHTML(feature.desc.date_time.trim());
		            layer.bindPopup(line_desc);
                }
            }
        }).addTo(this.map);
        self.trackingLines.push({car_name: car_name, car_type: car_type, status: status, group: group, layers: layers});
    },

    /**
     * カメラアイコンを設定する
     * @param url
     * @param width
     * @param height
     */
    setCameraIcon: function (url, width, height) {
        this.cameraIcon = L.icon({
            iconUrl: url,
            iconSize: [width, height],
            iconAnchor: [Math.round(width / 2), Math.round(height / 2)],
            popupAnchor: [0, -Math.round(height / 2)]
        });
    },

    /**
     * カメラアイコンを追加する
     */
    addCameraMarker: function (geojson) {
        if (geojson === "") return;
        var self = this;
        var layers = L.geoJSON(geojson, {
            pointToLayer: function (feature, latlng) {
                var icon = self.cameraIcon;
                var description = escapeHTML(feature.properties.name) + '<br>' +
                    '<img src="' + escapeHTML(feature.properties.img) + '" width="128" height="128"><br>' +
                    '<a href="' + escapeHTML(feature.properties.url) + '" target="_brank">詳細</a>';

                return L.marker(latlng, {icon: icon}).bindPopup(description);
            }
        }).addTo(this.map);
    },

    /**
     * スポットを追加する
     * @param data
     */
    addSpotMarker: function (data,icon_path,pop) {
        var latlng = data;
        var icon = L.icon({
            iconUrl: icon_path,
            iconSize: [24, 50],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });
        var layer = L.marker([latlng[1],latlng[0]], {icon: icon})
        var newpopup = L.popup({
            closeOnClick: false,
            autoClose: false
          }).setContent(pop);
        layer.on('mouseover', function() { layer.openPopup(); }); // マウスオーバー
        layer.on('mouseout', function() { layer.closePopup(); }); // マウスアウト
        layer
        .bindPopup(pop,
                {
                  autoClose:false,
                  closeOnClick:false,
                  keepInView:true,
                  autoPan:false
                })
            .addTo(this.map);

        this.spotMarkers.push(layer);
    },
    /**
     * ユーザーの現在位置を表示する
     * @param data
     */
    addMySpotMarker: function (data,icon_path,pop){
        var latlng = data;
        var icon = L.icon({
            iconUrl: icon_path,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });
        var layer = L.marker([latlng[1],latlng[0]], {icon: icon})
            .bindPopup(pop)
            .addTo(this.map);
        this.mySpotMerker = layer;
        this.mySpotMerker.openPopup();
    },
    /**
     * ユーザーの現在位置を削除する
     * @param data
     */
    removeMySpotMarker: function () {
        if (this.mySpotMerker != null){
            this.map.removeLayer(this.mySpotMerker);
        }
    },
    addAreaSpotMarker: function (area_name,points,icon_hash) {
        for( let i = 0; i < points.length; i+=1 ){
            if( area_name === points[i].area_group ){
                let icon = L.icon({
                    iconUrl: icon_hash[points[i].shop_type],
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -32]
                });
                let layer = L.marker([points[i].lat, points[i].lon], {icon: icon})
                    .bindPopup(points[i].name,{
                        autoClose:false,
                        closeOnClick:false,
                        keepInView:true,
                        autoPan:false
                      })
                    .addTo(this.map);
                this.areaSpotMarkers.push({
                    spot_name:points[i].name,
                    address:points[i].desc,
                    shop_type:points[i].shop_type,
                    layer: layer});
            }
        }
    },
    removeAreaSpotMarker: function () {
        for( let i = 0; i < this.areaSpotMarkers.length; i+=1 ){
            this.map.removeLayer(this.areaSpotMarkers[i].layer);
        }
        this.areaSpotMarkers = [];
    },
        /**
     * すべてのショップが入るようにマップをフィットする
     */
    areafitBounds: function () {
        // var group = new L.featureGroup(this.areaSpotMarkers.layer);
        // this.map.fitBounds(group.getBounds());

        var latLngs = this.areaSpotMarkers.map(function (marker) {
            return marker.layer.getLatLng();
        });
        if (latLngs.length === 0) return;
        this.map.fitBounds(L.latLngBounds(latLngs));

    },
    /**
     * 施設名をクリックした際の挙動（zoom or pan)
     */
    clickShopLabel: function (name, options) {

        for (var i = 0; i < this.areaSpotMarkers.length; i += 1) {
		    var list_name = this.areaSpotMarkers[i].spot_name;
            if (list_name === name) {
                // pan
                if (options['pan']) {
                    this.map.panTo(this.areaSpotMarkers[i].layer.getLatLng());
                    this.areaSpotMarkers[i].layer.openPopup();
                }else{
                // zoom
                    this.map.fitBounds([this.areaSpotMarkers[i].layer.getLatLng()]);
                    this.areaSpotMarkers[i].layer.openPopup();
                }return;
            }
        }
    },

    /**
     * エリアを追加する
     * @param geojson
     */
    addArea: function (geojson) {
        if (geojson === "") return;
        var layers = L.geoJSON(geojson).bindPopup(function (layer) {
            return escapeHTML(layer.feature.properties["路線名"]);
        }).addTo(this.map);
    },

    /**
     * マップの表示座標を設定する
     * @param lonlat
     * @param zoom
     */
    setView: function (lonlat, zoom) {
        this.map.setView([lonlat[1], lonlat[0]], zoom);
    },

    /**
     * 車両名をクリックした際の挙動（zoom or pan)
     */
    clickCarLabel: function (name, options) {

        for (var i = 0; i < this.carMarkers.length; i += 1) {
            if (this.carMarkers[i].sub_name) {
		        var list_name = this.carMarkers[i].sub_name + this.carMarkers[i].car_name;
		    } else {
		        var list_name = this.carMarkers[i].car_name;
            }
            if (list_name === name) {
                // pan
                if (options['pan']) {
                    this.map.panTo(this.carMarkers[i].layer.getLatLng());
                    this.carMarkers[i].layer.openPopup();
                }else{
                // zoom
                    this.map.fitBounds([this.carMarkers[i].layer.getLatLng()]);
                    this.carMarkers[i].layer.openPopup();
                }return;
            }
        }
    },

    /**
     * すべての車両が入るようにマップをフィットする
     */
    fitBounds: function () {
        var latLngs = this.carMarkers.map(function (marker) {
            return marker.layer.getLatLng();
        });
        if (latLngs.length === 0) return;
        this.map.fitBounds(L.latLngBounds(latLngs), {maxZoom: 15, padding: [15, 15]});
    },

    /**
     * 指定した車両が入るようにマップをフィットする
     * @param {Array.<string>} car_names 車両名のリスト
     */
    fitCars: function (car_names) {
        var latLngs = [];
        for (var i = 0; i < this.carMarkers.length; i += 1) {
            if (car_names.includes(this.carMarkers[i].car_name)) {
                latLngs.push(this.carMarkers[i].layer.getLatLng());
            }
        }
        if (latLngs.length === 0) return;
        this.map.fitBounds(L.latLngBounds(latLngs), {maxZoom: 15, padding: [15, 15]});
    },

    /**
     * 走行ライン全体が入るようにマップをフィットする
     */
    fitTrackingLines: function () {
        var bounds = L.latLngBounds();
        this.trackingLines.forEach(function (trackingLine) {
            bounds.extend(trackingLine.layers.getBounds());
        });
        this.map.fitBounds(bounds)
    },

    /**
     * 車両を非表示にする
     * @param {string} name 車両名
     */
    hideCar: function (name) {
        for (var i = 0; i < this.trackingLines.length; i += 1) {
            if (this.trackingLines[i].car_name === name) {
                this.map.removeLayer(this.trackingLines[i].layers);
                return;
            }
        }
    },

    /**
     * 車両を表示する
     * @param {string} name 車両名
     */
    showCar: function (name) {
        for (var i = 0; i < this.trackingLines.length; i += 1) {
            if (this.trackingLines[i].car_name === name) {
                this.map.addLayer(this.trackingLines[i].layers);
                return;
            }
        }
    },

    /**
     * 指定した車種の車両だけを表示する
     * @param {string} car_type 表示する車種
     * @returns {Array} 表示する車両名のリスト
     */
    selectCarType: function (car_type) {
        var car_names = [];
        for (var i = 0; i < this.trackingLines.length; i += 1) {
            if (this.trackingLines[i].car_type === car_type || car_type === '') {
                this.map.addLayer(this.trackingLines[i].layers);
                car_names.push(this.trackingLines[i].car_name);
            } else {
                this.map.removeLayer(this.trackingLines[i].layers);
            }
        }
        return car_names;
    },

    /**
     * 指定した車両名の車両だけを表示する
     * @param {Array.<string>} car_names 表示する車両名のリスト
     */
    selectCarName: function (car_names) {
        for (var i = 0; i < this.trackingLines.length; i += 1) {
            if (car_names.indexOf(this.trackingLines[i].car_name) !== -1) {
                this.map.addLayer(this.trackingLines[i].layers);
            } else {
                this.map.removeLayer(this.trackingLines[i].layers);
            }
        }
    },

    /**
     * 指定した稼働状態の車両だけを表示する
     * @param {number} car_status 表示する稼働状態(1: 稼働中, -1: 非稼働）
     * @returns {Array} 表示する車両名のリスト
     */
    selectCarStatus: function (car_status) {
        var car_names = [];
        for (var i = 0; i < this.trackingLines.length; i += 1) {
            if (car_status.indexOf(this.trackingLines[i].status) !== -1) {
                this.map.addLayer(this.trackingLines[i].layers);
                car_names.push(this.trackingLines[i].car_name);
            } else {
                this.map.removeLayer(this.trackingLines[i].layers);
            }
        }
        return car_names;
    },

    /**
     * 指定した車種・稼働状態の車両だけを表示する
     * @param {string} car_type 車種
     * @param {number} car_status 稼働状態
     * @param [string] group
     * @returns {Array} 表示する車両名のリスト
     */
    select: function (car_type, car_status, group) {
        var car_names = [];
        for (var i = 0; i < this.trackingLines.length; i += 1) {
            if ((this.trackingLines[i].car_type === car_type || car_type === '') && car_status.indexOf(this.trackingLines[i].status) !== -1 && (this.trackingLines[i].group.indexOf(group) !== -1 || group === '')) {
                this.map.addLayer(this.trackingLines[i].layers);
                car_names.push(this.trackingLines[i].car_name);
            } else {
                this.map.removeLayer(this.trackingLines[i].layers);
            }
        }
        return car_names;
    },

    /**
     * すべての車両を削除する
     */
    clear: function () {
        for (var i = 0; i < this.trackingLines.length; i += 1) {
            this.map.removeLayer(this.trackingLines[i].layers);
        }
        this.carMarkers = [];
        this.trackingLines = [];
    },

    removeAreaLyer: function() {
        this.map.removeLayer(areaPolygon);
    },

    addAreaLyer: function(geoJsonData){
        areaPolygon = L.geoJson(geoJsonData,{
            onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.popup);
            }
        });
        this.map.addLayer(areaPolygon);
    },
    remove: function(){
       this.map.remove(); 
    },
    invalidateSize: function(){
        this.map.invalidateSize();
    }
};
