const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);

// GDP per capita (avoiding countries with small pop)
const getVal = feat => feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);
let world
fetch('ne_110m_admin_0_countries.geojson').then(res => res.json()).then(countries =>
{
    const maxVal = Math.max(...countries.features.map(getVal));
    colorScale.domain([0, maxVal]);

    world = Globe().width(window.innerWidth*.5)
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
    // .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
    .backgroundColor("#030f22")
    .lineHoverPrecision(0)
    .polygonsData(countries.features.filter(d => d.properties.ISO_A2 !== 'AQ'))
    .polygonAltitude(0.06)
    .polygonCapColor(feat => colorScale(getVal(feat)))
    .polygonSideColor(() => 'rgba(0, 100, 0, 0.15)')
    .polygonStrokeColor(() => '#111')
    .polygonsTransitionDuration(600)
    (document.getElementById('globeViz'))
    world.controls().enabled= false;

    setSection()
})

let currentSection = 0;

function nextSection() {
    if (currentSection < sections.length-1) {
        currentSection++;
        setSection();
    } else {
        currentSection = 0
        setSection()
    }
}

function prevSection() {
    if (currentSection > 0) {
        currentSection--;
        setSection();
    } else {
        currentSection = sections.length-1
        setSection()
    }
}

function setSection() {
    let section = sections[currentSection]
    let info = `<div id="infoContent">
    <h1>${section.name}</h1>
    <div id="infoBody">
        ${section.body}
    </div>
    <button id="prev"><i class="fa fa-arrow-left"></i></i></button>
    <button id="next"><i class="fa fa-arrow-right"></i></i></button>
    </div>`
    document.getElementById('info').innerHTML = info;
    document.getElementById('info').scrollTop = 0
    document.getElementById('next').onclick = nextSection;
    document.getElementById('prev').onclick = prevSection;
    if (currentSection === 3) {
        internetChart()
    } if (currentSection === 2) {
        profitChart()
    }

    world.polygonAltitude(0.06)
    .polygonCapColor(d => colorScale(getVal(d)))
    world.pointOfView({ lat: section.lat, lng: section.lng, altitude: section.alt }, 1500);
    setTimeout(() => {
        if (section.cidx === 0) {
            world.polygonAltitude(0.06)
            .polygonCapColor(d => colorScale(getVal(d)))
        }else if (section.cidx === 999) {
            world.polygonAltitude(0.06)
            .polygonCapColor(d => colorScale(getVal(d)))
        } else {
            world.polygonAltitude(d => d === world.polygonsData()[section.cidx] ? 0.12 : 0.06)
            .polygonCapColor(d => d === world.polygonsData()[section.cidx] ? 'steelblue' : colorScale(getVal(d)))
        }
    },1000)
    world.camera().position.z = 1000
}

function hideInfo() {
  document.getElementById('info').innerHTML = '';
}
