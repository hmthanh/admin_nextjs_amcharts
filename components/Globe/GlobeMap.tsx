import { useEffect } from 'react';

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
        easing: am5.ease.inOut(am5.ease.cubic),
      });
      chart.animate({
        key: "rotationY",
        to: -centroid.latitude,
        duration: 1500,
        easing: am5.ease.inOut(am5.ease.cubic),
      });
    }
  }
}

export default function GlobeMap() {
  // am5.useTheme(am5themes_Animated);
  useEffect(() => {
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
        projection: am5map.geoOrthographic(),
      }),
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
        "M45.418 10c-2.293-2.5-5.625-3.957-8.961-4.168h-.414c-4.168 0-7.918 2.086-10.418 5.418-2.293-4.375-6.668-7.082-11.457-7.082h-.211c-3.539 0-7.082 1.457-9.375 4.164-2.5 2.5-3.75 6.043-3.539 9.586C1.457 24.168 4.582 27.293 7.5 30c3.332 3.332 6.457 6.043 5.418 13.957 0 1.25.625 2.086 1.664 2.086.418 0 .625 0 1.25-.211C37.5 39.168 48.957 30.207 48.957 20.207V20c.211-3.957-1.039-7.293-3.539-10ZM14.582 44.793V43.75Zm0 0",
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
        fill: am5.color(0x000000),
      }),
    );
    backgroundSeries.mapPolygons.template.setAll({
      // fill: root.interfaceColors.get("alternativeBackground"),
      fillGradient: am5.LinearGradient.new(root, {
        stops: [
          {
            color: am5.color(0x85abf9),
          },
          {
            color: am5.color(0xf4eddd),
          },
        ],
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
      shadowOpacity: 0.5,
    });

    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
    });

    // Create main polygon series for countries
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
      }),
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
      interactive: true,
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: root.interfaceColors.get("primaryButtonHover"),
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
      tooltipText: "{name}:{value}",
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
        am5.color("#FC7149"),
      ],
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
      { id: "GB", name: "United Kingdom", value: 62417431, polygonTemplate: { fill: colors.getIndex(8) } },
      { id: "US", name: "United States", value: 313085380, polygonTemplate: { fill: colors.getIndex(4) } },
      { id: "UY", name: "Uruguay", value: 3380008, polygonTemplate: { fill: colors.getIndex(3) } },
      { id: "UZ", name: "Uzbekistan", value: 27760267, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "VE", name: "Venezuela", value: 29436891, polygonTemplate: { fill: colors.getIndex(3) } },
      { id: "PS", name: "West Bank and Gaza", value: 4152369, polygonTemplate: { fill: colors.getIndex(0) } },
      { id: "VN", name: "Vietnam", value: 88791996, polygonTemplate: { fill: am5.color("#FF00B8") } },
      { id: "YE", name: "Yemen, Rep.", value: 24799880, polygonTemplate: { fill: colors.getIndex(0) } },
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

    // // Create circles when data for countries is fully loaded.
    // polygonSeries.events.on("datavalidated", function () {
    //   circleSeries.data.clear();

    //   for (var i = 0; i < data.length; i++) {
    //     let dataContext = data[i];
    //     let countryDataItem = polygonSeries.getDataItemById(dataContext.id);
    //     let countryPolygon = countryDataItem?.get("mapPolygon");

    //     let value = dataContext.value;

    //     let radius = minRadius + (maxRadius * (value - valueLow)) / (valueHigh - valueLow);

    //     if (countryPolygon) {
    //       let geometry = am5map.getGeoCircle(countryPolygon.visualCentroid(), radius);
    //       circleSeries.data.push({
    //         name: dataContext.name,
    //         value: dataContext.value,
    //         polygonTemplate: dataContext.polygonTemplate,
    //         geometry: geometry
    //       });
    //     }
    //   }
    // });

    // Rotate animation
    chart.animate({
      key: "rotationX",
      from: 0,
      to: 360,
      duration: 30000,
      loops: Infinity,
    });

    var cities = [
      {
        title: "Vienna",
        latitude: 48.2092,
        longitude: 16.3728,
      },
      {
        title: "Minsk",
        latitude: 53.9678,
        longitude: 27.5766,
      },
      {
        title: "Paris",
        latitude: 48.8567,
        longitude: 2.351,
      },
      {
        title: "Berlin",
        latitude: 52.5235,
        longitude: 13.4115,
      },
      {
        title: "Rome",
        latitude: 41.8955,
        longitude: 12.4823,
      },
      {
        title: "Luxembourg",
        latitude: 49.61,
        longitude: 6.1296,
      },
      {
        title: "Amsterdam",
        latitude: 52.3738,
        longitude: 4.891,
      },
      {
        title: "Warsaw",
        latitude: 52.2297,
        longitude: 21.0122,
      },
      {
        title: "Moscow",
        latitude: 55.7558,
        longitude: 37.6176,
      },
      {
        title: "Stockholm",
        latitude: 59.3328,
        longitude: 18.0645,
      },
      {
        title: "Kiev",
        latitude: 50.4422,
        longitude: 30.5367,
      },
      {
        title: "London",
        latitude: 51.5002,
        longitude: -0.1262,
      },
      {
        title: "Saint Peter Port",
        latitude: 49.466,
        longitude: -2.5522,
      },
      {
        title: "Phnom Penh",
        latitude: 11.5434,
        longitude: 104.8984,
      },
      {
        title: "Peking",
        latitude: 39.9056,
        longitude: 116.3958,
      },
      {
        title: "New Delhi",
        latitude: 28.6353,
        longitude: 77.225,
      },
      {
        title: "Jakarta",
        latitude: -6.1862,
        longitude: 106.8063,
      },
      {
        title: "Teheran",
        latitude: 35.7061,
        longitude: 51.4358,
      },
      {
        title: "Jerusalem",
        latitude: 31.76,
        longitude: 35.17,
      },
      {
        title: "Tokyo",
        latitude: 35.6785,
        longitude: 139.6823,
      },
      {
        title: "Vientiane",
        latitude: 17.9689,
        longitude: 102.6137,
      },
      {
        title: "Kuala Lumpur",
        latitude: 3.1502,
        longitude: 101.7077,
      },
      {
        title: "Pyinmana",
        latitude: 19.7378,
        longitude: 96.2083,
      },
      {
        title: "Kathmandu",
        latitude: 27.7058,
        longitude: 85.3157,
      },
      {
        title: "Muscat",
        latitude: 23.6086,
        longitude: 58.5922,
      },
      {
        title: "Islamabad",
        latitude: 33.6751,
        longitude: 73.0946,
      },
      {
        title: "Manila",
        latitude: 14.579,
        longitude: 120.9726,
      },
      {
        title: "Doha",
        latitude: 25.2948,
        longitude: 51.5082,
      },
      {
        title: "Riyadh",
        latitude: 24.6748,
        longitude: 46.6977,
      },
      {
        title: "Singapore",
        latitude: 1.2894,
        longitude: 103.85,
      },
      {
        title: "Seoul",
        latitude: 37.5139,
        longitude: 126.9828,
      },
      {
        title: "Colombo",
        latitude: 6.9155,
        longitude: 79.8572,
      },
      {
        title: "Dushanbe",
        latitude: 38.5737,
        longitude: 68.7738,
      },
      {
        title: "Bangkok",
        latitude: 13.7573,
        longitude: 100.502,
      },
      {
        title: "Hanoi",
        latitude: 21.0341,
        longitude: 105.8372,
      },
      {
        title: "Sanaa",
        latitude: 15.3556,
        longitude: 44.2081,
      },
      {
        title: "San Jose",
        latitude: 9.9402,
        longitude: -84.1002,
      },
      {
        title: "Dakar",
        latitude: 14.6953,
        longitude: -17.4439,
      },
      {
        title: "Freetown",
        latitude: 8.4697,
        longitude: -13.2659,
      },
      {
        title: "Mogadishu",
        latitude: 2.0411,
        longitude: 45.3426,
      },
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
        tooltipText: "{title}",
      });

      return am5.Bullet.new(root, {
        sprite: circle,
      });
    });

    for (var i = 0; i < cities.length; i++) {
      var city = cities[i];
      addCity(city.longitude, city.latitude, city.title);
    }

    function addCity(longitude: number, latitude: any, title: string) {
      pointSeries.data.push({
        geometry: { type: "Point", coordinates: [longitude, latitude] },
        title: title,
      });
    }

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full flex justify-center align-middle items-center ">
      <div
        id="GlobeMap"
        style={{
          width: "100%",
          // width: "600px",
          // height: "650px",
          height: "800px",
          zIndex: 99999,
        }}
      />
    </div>
  );
}
