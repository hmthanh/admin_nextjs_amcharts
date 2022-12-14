import { useLayoutEffect } from "react";

import * as am5 from "@amcharts/amcharts5";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function selectCountry(chart: any, polygonSeries: any, id: any) {
  var dataItem = polygonSeries.getDataItemById(id);
  var target = dataItem.get("mapPolygon");
  if (target) {
    var centroid = target.geoCentroid();
    if (centroid) {
      chart.animate({
        key: "rotationX",
        to: -centroid.longitude,
        duration: 1500,
        easing: am5.ease.inOut(am5.ease.cubic)
      });
      chart.animate({
        key: "rotationY",
        to: -centroid.latitude,
        duration: 1500,
        easing: am5.ease.inOut(am5.ease.cubic)
      });
    }
  }
}

export default function GlobeMap() {
  // am5.useTheme(am5themes_Animated);
  useLayoutEffect(() => {
    let root = am5.Root.new("GlobeMap");
    root._logo?.dispose();

    root.setThemes([am5themes_Animated.new(root)]);

    // Create the map chart
    // https://www.amcharts.com/docs/v5/charts/map-chart/
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        // panY: "rotateY",
        panY: "none",
        projection: am5map.geoOrthographic()
      })
    );

    // Add image series
    // MapImageSeries
    // let imageSeries = chart.series.push(new am5map.MapImageSeries());
    // let imageSeries = chart.series.push(
    //   am5.Picture.new(root, {
    //     width: 32,
    //     height: 32,
    //     src: "/images/icon_btc.svg"
    //   })
    // );
    // imageSeries.mapImages.template.propertyFields.longitude = "longitude";
    // imageSeries.mapImages.template.propertyFields.latitude = "latitude";
    let svgMarker = am5.Graphics.new(root, {
      stroke: am5.color(0x000000),
      fill: am5.color(0x990000),
      svgPath:
        "M45.418 10c-2.293-2.5-5.625-3.957-8.961-4.168h-.414c-4.168 0-7.918 2.086-10.418 5.418-2.293-4.375-6.668-7.082-11.457-7.082h-.211c-3.539 0-7.082 1.457-9.375 4.164-2.5 2.5-3.75 6.043-3.539 9.586C1.457 24.168 4.582 27.293 7.5 30c3.332 3.332 6.457 6.043 5.418 13.957 0 1.25.625 2.086 1.664 2.086.418 0 .625 0 1.25-.211C37.5 39.168 48.957 30.207 48.957 20.207V20c.211-3.957-1.039-7.293-3.539-10ZM14.582 44.793V43.75Zm0 0"
    });
    // chart.events.on("ready", updateCustomMarkers);
    // chart.events.on("mappositionchanged", updateCustomMarkers);

    // const updateCustomMarkers = (event: any) => {
    //   // go through all of the images
    //   imageSeries.mapImages.each(function (image: any) {
    //     // check if it has corresponding HTML element
    //     if (!image.dummyData || !image.dummyData.externalElement) {
    //       // create onex
    //       image.dummyData = {
    //         externalElement: createCustomMarker(image)
    //       };
    //     }

    //     // reposition the element accoridng to coordinates
    //     let xy = chart.geoPointToSVG({ longitude: image.longitude, latitude: image.latitude });
    //     image.dummyData.externalElement.style.top = xy.y + "px";
    //     image.dummyData.externalElement.style.left = xy.x + "px";
    //   });
    // };

    // imageSeries.data = [
    //   {
    //     title: "Paris",
    //     latitude: 48.8567,
    //     longitude: 2.351
    //   },
    //   {
    //     title: "Moscow",
    //     latitude: 55.7558,
    //     longitude: 37.6176
    //   },
    //   {
    //     title: "London",
    //     latitude: 51.5002,
    //     longitude: -0.1262,
    //     url: "http://www.google.co.uk"
    //   },
    //   {
    //     title: "Peking",
    //     latitude: 39.9056,
    //     longitude: 116.3958
    //   },
    //   {
    //     title: "New Delhi",
    //     latitude: 28.6353,
    //     longitude: 77.225
    //   },
    //   {
    //     title: "Washington",
    //     latitude: 38.8921,
    //     longitude: -77.0241
    //   },
    //   {
    //     title: "Cairo",
    //     latitude: 30.0571,
    //     longitude: 31.2272
    //   }
    // ];

    // Create series for background fill
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
    let backgroundSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        fill: am5.color(0x000000)
      })
    );
    backgroundSeries.mapPolygons.template.setAll({
      // fill: root.interfaceColors.get("alternativeBackground"),
      fillGradient: am5.LinearGradient.new(root, {
        stops: [
          {
            color: am5.color(0x85abf9)
          },
          {
            color: am5.color(0xf4eddd)
          }
        ]
      }),
      // fill: am5.color(0x000000),
      // fillOpacity: 0.1,
      fillOpacity: 0.4,
      strokeOpacity: 0,
      strokeWidth: 2,
      shadowColor: am5.color(0x000000),
      shadowBlur: 10,
      shadowOffsetX: 10,
      shadowOffsetY: 10,
      shadowOpacity: 0.5
    });

    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180)
    });

    // Create main polygon series for countries
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow
      })
    );
    // polygonSeries.mapPolygons.template.setAll({
    //   fill: root.interfaceColors.get("alternativeBackground"),
    //   fillOpacity: 0.15,
    //   strokeWidth: 0.5,
    //   stroke: root.interfaceColors.get("background")
    // });

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      toggleKey: "active",
      interactive: true
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: root.interfaceColors.get("primaryButtonHover")
    });

    // polygonSeries.mapPolygons.template.states.create("active", {
    //   fill: root.interfaceColors.get("primaryButtonHover")
    // });

    // // Set up events
    // var previousPolygon: any;
    // polygonSeries.mapPolygons.template.on(
    //   "active",
    //   function (active: boolean | undefined, target: am5map.MapPolygon | undefined) {
    //     if (previousPolygon && previousPolygon != target) {
    //       previousPolygon.set("active", false);
    //     }
    //     console.log("target?.dataItem?", target?.dataItem);

    //     if (target?.get("active")) {
    //       // @ts-ignore
    //       selectCountry(chart, polygonSeries, target?.dataItem?.get("id"));
    //     }
    //     previousPolygon = target;
    //   }
    // );

    // Create polygon series for projected circles
    let circleSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
    circleSeries.mapPolygons.template.setAll({
      templateField: "polygonTemplate",
      tooltipText: "{name}:{value}"
    });

    // Define data
    let colorSettings: am5.IColorSetSettings = {
      colors: [
        am5.color("#FF0000"),
        am5.color("#00A1D0"),
        am5.color("#00C195"),
        am5.color("#7ED321"),
        am5.color("#A8C600"),
        am5.color("#C9B600"),
        am5.color("#E3A600"),
        am5.color("#F7941E"),
        am5.color("#FC7149")
      ]
    };
    let colors = am5.ColorSet.new(root, colorSettings);

    let data = [
      // { id: "CM", name: "Cameroon", value: 20030362, polygonTemplate: { fill: colors.getIndex(2) } },
      // { id: "CA", name: "Canada", value: 34349561, polygonTemplate: { fill: colors.getIndex(4) } },
      { id: "IT", name: "Italy", value: 60788694, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "JM", name: "Jamaica", value: 2751273, polygonTemplate: { fill: colors.getIndex(4) } },
      { id: "JP", name: "Japan", value: 126497241, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "JO", name: "Jordan", value: 6330169, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "KZ", name: "Kazakhstan", value: 16206750, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "KE", name: "Kenya", value: 41609728, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "KP", name: "Korea, Dem. Rep.", value: 24451285, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "KR", name: "Korea, Rep.", value: 48391343, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "KW", name: "Kuwait", value: 2818042, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "KG", name: "Kyrgyzstan", value: 5392580, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "LA", name: "Laos", value: 6288037, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "LV", name: "Latvia", value: 2243142, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "LB", name: "Lebanon", value: 4259405, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "LS", name: "Lesotho", value: 2193843, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "LR", name: "Liberia", value: 4128572, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "LY", name: "Libya", value: 6422772, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "LT", name: "Lithuania", value: 3307481, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "LU", name: "Luxembourg", value: 515941, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "MK", name: "Macedonia, FYR", value: 2063893, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "MG", name: "Madagascar", value: 21315135, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "MW", name: "Malawi", value: 15380888, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "MY", name: "Malaysia", value: 28859154, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "ML", name: "Mali", value: 15839538, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "MR", name: "Mauritania", value: 3541540, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "MU", name: "Mauritius", value: 1306593, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "MX", name: "Mexico", value: 114793341, polygonTemplate: { fill: colors.getIndex(4) } },
      { id: "MD", name: "Moldova", value: 3544864, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "MN", name: "Mongolia", value: 2800114, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "ME", name: "Montenegro", value: 632261, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "MA", name: "Morocco", value: 32272974, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "MZ", name: "Mozambique", value: 23929708, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "MM", name: "Myanmar", value: 48336763, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "NA", name: "Namibia", value: 2324004, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "NP", name: "Nepal", value: 30485798, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "NL", name: "Netherlands", value: 16664746, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "NZ", name: "New Zealand", value: 4414509, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "NI", name: "Nicaragua", value: 5869859, polygonTemplate: { fill: colors.getIndex(4) } },
      { id: "NE", name: "Niger", value: 16068994, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "NG", name: "Nigeria", value: 162470737, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "NO", name: "Norway", value: 4924848, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "OM", name: "Oman", value: 2846145, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "PK", name: "Pakistan", value: 176745364, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "PA", name: "Panama", value: 3571185, polygonTemplate: { fill: colors.getIndex(4) } },
      { id: "PG", name: "Papua New Guinea", value: 7013829, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "PY", name: "Paraguay", value: 6568290, polygonTemplate: { fill: colors.getIndex(3) } },
      { id: "PE", name: "Peru", value: 29399817, polygonTemplate: { fill: colors.getIndex(3) } },
      { id: "PH", name: "Philippines", value: 94852030, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "PL", name: "Poland", value: 38298949, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "PT", name: "Portugal", value: 10689663, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "QA", name: "Qatar", value: 1870041, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "RO", name: "Romania", value: 21436495, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "RU", name: "Russia", value: 142835555, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "RW", name: "Rwanda", value: 10942950, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "SA", name: "Saudi Arabia", value: 28082541, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "SN", name: "Senegal", value: 12767556, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "RS", name: "Serbia", value: 9853969, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "SL", name: "Sierra Leone", value: 5997486, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "SG", name: "Singapore", value: 5187933, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "SK", name: "Slovak Republic", value: 5471502, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "SI", name: "Slovenia", value: 2035012, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "SB", name: "Solomon Islands", value: 552267, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "SO", name: "Somalia", value: 9556873, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "ZA", name: "South Africa", value: 50459978, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "ES", name: "Spain", value: 46454895, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "LK", name: "Sri Lanka", value: 21045394, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "SD", name: "Sudan", value: 34735288, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "SR", name: "Suriname", value: 529419, polygonTemplate: { fill: colors.getIndex(3) } },
      { id: "SZ", name: "Swaziland", value: 1203330, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "SE", name: "Sweden", value: 9440747, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "CH", name: "Switzerland", value: 7701690, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "SY", name: "Syria", value: 20766037, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "TW", name: "Taiwan", value: 23072000, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "TJ", name: "Tajikistan", value: 6976958, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "TZ", name: "Tanzania", value: 46218486, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "TH", name: "Thailand", value: 69518555, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "TG", name: "Togo", value: 6154813, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "TT", name: "Trinidad and Tobago", value: 1346350, polygonTemplate: { fill: colors.getIndex(4) } },
      { id: "TN", name: "Tunisia", value: 10594057, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "TR", name: "Turkey", value: 73639596, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "TM", name: "Turkmenistan", value: 5105301, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "UG", name: "Uganda", value: 34509205, polygonTemplate: { fill: colors.getIndex(2) } },
      { id: "UA", name: "Ukraine", value: 45190180, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "AE", name: "United Arab Emirates", value: 7890924, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "GB", name: "United Kingdom", value: 62417431, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "US", name: "United States", value: 313085380, polygonTemplate: { fill: colors.getIndex(4) } },
      { id: "UY", name: "Uruguay", value: 3380008, polygonTemplate: { fill: colors.getIndex(3) } },
      { id: "UZ", name: "Uzbekistan", value: 27760267, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "VE", name: "Venezuela", value: 29436891, polygonTemplate: { fill: colors.getIndex(3) } },
      { id: "PS", name: "West Bank and Gaza", value: 4152369, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "VN", name: "Vietnam", value: 88791996, polygonTemplate: { fill: am5.color("#FF00B8") } },
      { id: "YE", name: "Yemen, Rep.", value: 24799880, polygonTemplate: { fill: colors.getIndex(0) } }
    ];

    let valueLow = Infinity;
    let valueHigh = -Infinity;

    for (var i = 0; i < data.length; i++) {
      let value = data[i].value;
      if (value < valueLow) {
        valueLow = value;
      }
      if (value > valueHigh) {
        valueHigh = value;
      }
    }

    // radius in degrees
    let minRadius = 0.5;
    let maxRadius = 5;

    // Create circles when data for countries is fully loaded.
    polygonSeries.events.on("datavalidated", function () {
      circleSeries.data.clear();

      for (var i = 0; i < data.length; i++) {
        let dataContext = data[i];
        let countryDataItem = polygonSeries.getDataItemById(dataContext.id);
        let countryPolygon = countryDataItem?.get("mapPolygon");

        let value = dataContext.value;

        let radius = minRadius + (maxRadius * (value - valueLow)) / (valueHigh - valueLow);

        if (countryPolygon) {
          let geometry = am5map.getGeoCircle(countryPolygon.visualCentroid(), radius);
          circleSeries.data.push({
            name: dataContext.name,
            value: dataContext.value,
            polygonTemplate: dataContext.polygonTemplate,
            geometry: geometry
          });
        }
      }
    });

    // Rotate animation
    chart.animate({
      key: "rotationX",
      from: 0,
      to: 360,
      duration: 10000,
      loops: Infinity
    });

    var cities = [
      {
        title: "Vienna",
        latitude: 48.2092,
        longitude: 16.3728
      },
      {
        title: "Minsk",
        latitude: 53.9678,
        longitude: 27.5766
      },
      {
        title: "Brussels",
        latitude: 50.8371,
        longitude: 4.3676
      },
      {
        title: "Sarajevo",
        latitude: 43.8608,
        longitude: 18.4214
      },
      {
        title: "Sofia",
        latitude: 42.7105,
        longitude: 23.3238
      },
      {
        title: "Zagreb",
        latitude: 45.815,
        longitude: 15.9785
      },
      {
        title: "Pristina",
        latitude: 42.666667,
        longitude: 21.166667
      },
      {
        title: "Prague",
        latitude: 50.0878,
        longitude: 14.4205
      },
      {
        title: "Copenhagen",
        latitude: 55.6763,
        longitude: 12.5681
      },
      {
        title: "Tallinn",
        latitude: 59.4389,
        longitude: 24.7545
      },
      {
        title: "Helsinki",
        latitude: 60.1699,
        longitude: 24.9384
      },
      {
        title: "Paris",
        latitude: 48.8567,
        longitude: 2.351
      },
      {
        title: "Berlin",
        latitude: 52.5235,
        longitude: 13.4115
      },
      {
        title: "Athens",
        latitude: 37.9792,
        longitude: 23.7166
      },
      {
        title: "Budapest",
        latitude: 47.4984,
        longitude: 19.0408
      },
      {
        title: "Reykjavik",
        latitude: 64.1353,
        longitude: -21.8952
      },
      {
        title: "Dublin",
        latitude: 53.3441,
        longitude: -6.2675
      },
      {
        title: "Rome",
        latitude: 41.8955,
        longitude: 12.4823
      },
      {
        title: "Riga",
        latitude: 56.9465,
        longitude: 24.1049
      },
      {
        title: "Vaduz",
        latitude: 47.1411,
        longitude: 9.5215
      },
      {
        title: "Vilnius",
        latitude: 54.6896,
        longitude: 25.2799
      },
      {
        title: "Luxembourg",
        latitude: 49.61,
        longitude: 6.1296
      },
      {
        title: "Skopje",
        latitude: 42.0024,
        longitude: 21.4361
      },
      {
        title: "Valletta",
        latitude: 35.9042,
        longitude: 14.5189
      },
      {
        title: "Chisinau",
        latitude: 47.0167,
        longitude: 28.8497
      },
      {
        title: "Monaco",
        latitude: 43.7325,
        longitude: 7.4189
      },
      {
        title: "Podgorica",
        latitude: 42.4602,
        longitude: 19.2595
      },
      {
        title: "Amsterdam",
        latitude: 52.3738,
        longitude: 4.891
      },
      {
        title: "Oslo",
        latitude: 59.9138,
        longitude: 10.7387
      },
      {
        title: "Warsaw",
        latitude: 52.2297,
        longitude: 21.0122
      },
      {
        title: "Lisbon",
        latitude: 38.7072,
        longitude: -9.1355
      },
      {
        title: "Bucharest",
        latitude: 44.4479,
        longitude: 26.0979
      },
      {
        title: "Moscow",
        latitude: 55.7558,
        longitude: 37.6176
      },
      {
        title: "San Marino",
        latitude: 43.9424,
        longitude: 12.4578
      },
      {
        title: "Belgrade",
        latitude: 44.8048,
        longitude: 20.4781
      },
      {
        title: "Bratislava",
        latitude: 48.2116,
        longitude: 17.1547
      },
      {
        title: "Ljubljana",
        latitude: 46.0514,
        longitude: 14.506
      },
      {
        title: "Madrid",
        latitude: 40.4167,
        longitude: -3.7033
      },
      {
        title: "Stockholm",
        latitude: 59.3328,
        longitude: 18.0645
      },
      {
        title: "Bern",
        latitude: 46.948,
        longitude: 7.4481
      },
      {
        title: "Kiev",
        latitude: 50.4422,
        longitude: 30.5367
      },
      {
        title: "London",
        latitude: 51.5002,
        longitude: -0.1262
      },
      {
        title: "Gibraltar",
        latitude: 36.1377,
        longitude: -5.3453
      },
      {
        title: "Saint Peter Port",
        latitude: 49.466,
        longitude: -2.5522
      },
      {
        title: "Douglas",
        latitude: 54.167,
        longitude: -4.4821
      },
      {
        title: "Saint Helier",
        latitude: 49.1919,
        longitude: -2.1071
      },
      {
        title: "Longyearbyen",
        latitude: 78.2186,
        longitude: 15.6488
      },
      {
        title: "Kabul",
        latitude: 34.5155,
        longitude: 69.1952
      },
      {
        title: "Yerevan",
        latitude: 40.1596,
        longitude: 44.509
      },
      {
        title: "Baku",
        latitude: 40.3834,
        longitude: 49.8932
      },
      {
        title: "Manama",
        latitude: 26.1921,
        longitude: 50.5354
      },
      {
        title: "Dhaka",
        latitude: 23.7106,
        longitude: 90.3978
      },
      {
        title: "Thimphu",
        latitude: 27.4405,
        longitude: 89.673
      },
      {
        title: "Bandar Seri Begawan",
        latitude: 4.9431,
        longitude: 114.9425
      },
      {
        title: "Phnom Penh",
        latitude: 11.5434,
        longitude: 104.8984
      },
      {
        title: "Peking",
        latitude: 39.9056,
        longitude: 116.3958
      },
      {
        title: "Nicosia",
        latitude: 35.1676,
        longitude: 33.3736
      },
      {
        title: "T'bilisi",
        latitude: 41.701,
        longitude: 44.793
      },
      {
        title: "New Delhi",
        latitude: 28.6353,
        longitude: 77.225
      },
      {
        title: "Jakarta",
        latitude: -6.1862,
        longitude: 106.8063
      },
      {
        title: "Teheran",
        latitude: 35.7061,
        longitude: 51.4358
      },
      {
        title: "Baghdad",
        latitude: 33.3157,
        longitude: 44.3922
      },
      {
        title: "Jerusalem",
        latitude: 31.76,
        longitude: 35.17
      },
      {
        title: "Tokyo",
        latitude: 35.6785,
        longitude: 139.6823
      },
      {
        title: "Vientiane",
        latitude: 17.9689,
        longitude: 102.6137
      },
      {
        title: "Beyrouth / Beirut",
        latitude: 33.8872,
        longitude: 35.5134
      },
      {
        title: "Kuala Lumpur",
        latitude: 3.1502,
        longitude: 101.7077
      },
      {
        title: "Ulan Bator",
        latitude: 47.9138,
        longitude: 106.922
      },
      {
        title: "Pyinmana",
        latitude: 19.7378,
        longitude: 96.2083
      },
      {
        title: "Kathmandu",
        latitude: 27.7058,
        longitude: 85.3157
      },
      {
        title: "Muscat",
        latitude: 23.6086,
        longitude: 58.5922
      },
      {
        title: "Islamabad",
        latitude: 33.6751,
        longitude: 73.0946
      },
      {
        title: "Manila",
        latitude: 14.579,
        longitude: 120.9726
      },
      {
        title: "Doha",
        latitude: 25.2948,
        longitude: 51.5082
      },
      {
        title: "Riyadh",
        latitude: 24.6748,
        longitude: 46.6977
      },
      {
        title: "Singapore",
        latitude: 1.2894,
        longitude: 103.85
      },
      {
        title: "Seoul",
        latitude: 37.5139,
        longitude: 126.9828
      },
      {
        title: "Colombo",
        latitude: 6.9155,
        longitude: 79.8572
      },
      {
        title: "Damascus",
        latitude: 33.5158,
        longitude: 36.2939
      },
      {
        title: "Taipei",
        latitude: 25.0338,
        longitude: 121.5645
      },
      {
        title: "Dushanbe",
        latitude: 38.5737,
        longitude: 68.7738
      },
      {
        title: "Bangkok",
        latitude: 13.7573,
        longitude: 100.502
      },
      {
        title: "Dili",
        latitude: -8.5662,
        longitude: 125.588
      },
      {
        title: "Ankara",
        latitude: 39.9439,
        longitude: 32.856
      },
      {
        title: "Ashgabat",
        latitude: 37.9509,
        longitude: 58.3794
      },
      {
        title: "Abu Dhabi",
        latitude: 24.4764,
        longitude: 54.3705
      },
      {
        title: "Tashkent",
        latitude: 41.3193,
        longitude: 69.2481
      },
      {
        title: "Hanoi",
        latitude: 21.0341,
        longitude: 105.8372
      },
      {
        title: "Sanaa",
        latitude: 15.3556,
        longitude: 44.2081
      },
      {
        title: "Buenos Aires",
        latitude: -34.6118,
        longitude: -58.4173
      },
      {
        title: "Bridgetown",
        latitude: 13.0935,
        longitude: -59.6105
      },
      {
        title: "Belmopan",
        latitude: 17.2534,
        longitude: -88.7713
      },
      {
        title: "Sucre",
        latitude: -19.0421,
        longitude: -65.2559
      },
      {
        title: "Brasilia",
        latitude: -15.7801,
        longitude: -47.9292
      },
      {
        title: "Ottawa",
        latitude: 45.4235,
        longitude: -75.6979
      },
      {
        title: "Santiago",
        latitude: -33.4691,
        longitude: -70.642
      },
      {
        title: "Bogota",
        latitude: 4.6473,
        longitude: -74.0962
      },
      {
        title: "San Jose",
        latitude: 9.9402,
        longitude: -84.1002
      },
      {
        title: "Havana",
        latitude: 23.1333,
        longitude: -82.3667
      },
      {
        title: "Roseau",
        latitude: 15.2976,
        longitude: -61.39
      },
      {
        title: "Santo Domingo",
        latitude: 18.479,
        longitude: -69.8908
      },
      {
        title: "Quito",
        latitude: -0.2295,
        longitude: -78.5243
      },
      {
        title: "San Salvador",
        latitude: 13.7034,
        longitude: -89.2073
      },
      {
        title: "Guatemala",
        latitude: 14.6248,
        longitude: -90.5328
      },
      {
        title: "Ciudad de Mexico",
        latitude: 19.4271,
        longitude: -99.1276
      },
      {
        title: "Managua",
        latitude: 12.1475,
        longitude: -86.2734
      },
      {
        title: "Panama",
        latitude: 8.9943,
        longitude: -79.5188
      },
      {
        title: "Asuncion",
        latitude: -25.3005,
        longitude: -57.6362
      },
      {
        title: "Lima",
        latitude: -12.0931,
        longitude: -77.0465
      },
      {
        title: "Castries",
        latitude: 13.9972,
        longitude: -60.0018
      },
      {
        title: "Paramaribo",
        latitude: 5.8232,
        longitude: -55.1679
      },
      {
        title: "Washington D.C.",
        latitude: 38.8921,
        longitude: -77.0241
      },
      {
        title: "Montevideo",
        latitude: -34.8941,
        longitude: -56.0675
      },
      {
        title: "Caracas",
        latitude: 10.4961,
        longitude: -66.8983
      },
      {
        title: "Oranjestad",
        latitude: 12.5246,
        longitude: -70.0265
      },
      {
        title: "Cayenne",
        latitude: 4.9346,
        longitude: -52.3303
      },
      {
        title: "Plymouth",
        latitude: 16.6802,
        longitude: -62.2014
      },
      {
        title: "San Juan",
        latitude: 18.45,
        longitude: -66.0667
      },
      {
        title: "Algiers",
        latitude: 36.7755,
        longitude: 3.0597
      },
      {
        title: "Luanda",
        latitude: -8.8159,
        longitude: 13.2306
      },
      {
        title: "Porto-Novo",
        latitude: 6.4779,
        longitude: 2.6323
      },
      {
        title: "Gaborone",
        latitude: -24.657,
        longitude: 25.9089
      },
      {
        title: "Ouagadougou",
        latitude: 12.3569,
        longitude: -1.5352
      },
      {
        title: "Bujumbura",
        latitude: -3.3818,
        longitude: 29.3622
      },
      {
        title: "Yaounde",
        latitude: 3.8612,
        longitude: 11.5217
      },
      {
        title: "Bangui",
        latitude: 4.3621,
        longitude: 18.5873
      },
      {
        title: "Brazzaville",
        latitude: -4.2767,
        longitude: 15.2662
      },
      {
        title: "Kinshasa",
        latitude: -4.3369,
        longitude: 15.3271
      },
      {
        title: "Yamoussoukro",
        latitude: 6.8067,
        longitude: -5.2728
      },
      {
        title: "Djibouti",
        latitude: 11.5806,
        longitude: 43.1425
      },
      {
        title: "Cairo",
        latitude: 30.0571,
        longitude: 31.2272
      },
      {
        title: "Asmara",
        latitude: 15.3315,
        longitude: 38.9183
      },
      {
        title: "Addis Abeba",
        latitude: 9.0084,
        longitude: 38.7575
      },
      {
        title: "Libreville",
        latitude: 0.3858,
        longitude: 9.4496
      },
      {
        title: "Banjul",
        latitude: 13.4399,
        longitude: -16.6775
      },
      {
        title: "Accra",
        latitude: 5.5401,
        longitude: -0.2074
      },
      {
        title: "Conakry",
        latitude: 9.537,
        longitude: -13.6785
      },
      {
        title: "Bissau",
        latitude: 11.8598,
        longitude: -15.5875
      },
      {
        title: "Nairobi",
        latitude: -1.2762,
        longitude: 36.7965
      },
      {
        title: "Maseru",
        latitude: -29.2976,
        longitude: 27.4854
      },
      {
        title: "Monrovia",
        latitude: 6.3106,
        longitude: -10.8047
      },
      {
        title: "Tripoli",
        latitude: 32.883,
        longitude: 13.1897
      },
      {
        title: "Antananarivo",
        latitude: -18.9201,
        longitude: 47.5237
      },
      {
        title: "Lilongwe",
        latitude: -13.9899,
        longitude: 33.7703
      },
      {
        title: "Bamako",
        latitude: 12.653,
        longitude: -7.9864
      },
      {
        title: "Nouakchott",
        latitude: 18.0669,
        longitude: -15.99
      },
      {
        title: "Port Louis",
        latitude: -20.1654,
        longitude: 57.4896
      },
      {
        title: "Niamey",
        latitude: 13.5164,
        longitude: 2.1157
      },
      {
        title: "Abuja",
        latitude: 9.058,
        longitude: 7.4891
      },
      {
        title: "Kigali",
        latitude: -1.9441,
        longitude: 30.0619
      },
      {
        title: "Dakar",
        latitude: 14.6953,
        longitude: -17.4439
      },
      {
        title: "Freetown",
        latitude: 8.4697,
        longitude: -13.2659
      },
      {
        title: "Mogadishu",
        latitude: 2.0411,
        longitude: 45.3426
      },
      {
        title: "Pretoria",
        latitude: -25.7463,
        longitude: 28.1876
      },
      {
        title: "Mbabane",
        latitude: -26.3186,
        longitude: 31.141
      },
      {
        title: "Dodoma",
        latitude: -6.167,
        longitude: 35.7497
      },
      {
        title: "Lome",
        latitude: 6.1228,
        longitude: 1.2255
      },
      {
        title: "Tunis",
        latitude: 36.8117,
        longitude: 10.1761
      }
    ];

    // Create point series for markers
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
    var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

    pointSeries.bullets.push(function () {
      var circle = am5.Circle.new(root, {
        radius: 4,
        tooltipY: 0,
        fill: am5.color(0xffba00),
        stroke: root.interfaceColors.get("background"),
        strokeWidth: 2,
        tooltipText: "{title}"
      });

      return am5.Bullet.new(root, {
        sprite: circle
      });
    });

    for (var i = 0; i < cities.length; i++) {
      var city = cities[i];
      addCity(city.longitude, city.latitude, city.title);
    }

    function addCity(longitude: number, latitude: any, title: string) {
      pointSeries.data.push({
        geometry: { type: "Point", coordinates: [longitude, latitude] },
        title: title
      });
    }

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="GlobeMap" style={{ width: "100%", height: "500px" }}></div>;
}
