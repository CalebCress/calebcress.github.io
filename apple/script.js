let usePB = [
    0.001,
    0.002,
    0.004,
    0.01,
    0.02,
    0.17,
    1.8,
    5,
    11,
    26,
    75,
    175,
    356,
    681,
    1267,
    2055,
    3339,
    5219,
    8140,
    10942,
    14955,
    23288,
    31339,
    34952,
    39909,
    49494,
    65942,
    85000
  ]
let useGB = usePB.map((p) => {
    return p*1000000
})


let years =  [
    "1990",
    "1991",
    "1992",
    "1993",
    "1994",
    "1995",
    "1996",
    "1997",
    "1998",
    "1999",
    "2000",
    "2001",
    "2002",
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017"
]


function internetChart() {
    const ctx = document.getElementById(`internetChart`);

    new Chart(ctx, {
        type: `line`,
        data: {
        labels: years,
        datasets: [{
            label: `Internet Traffic (PB)`,
            data: usePB,
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });
}


function profitChart() {
    const ctx = document.getElementById(`profitChart`);

    new Chart(ctx, {
        type: `pie`,
        data: {
            labels: [
              `Apple's gross profits`,
              `Suppliers' gross profits`,
              `Raw materials`,
              `Non-China labor to manufacture components`,
              `China labor for components and assembly`,
            ],
            datasets: [{
              label: `Revenue share by %`,
              data: [58.5, 14.3, 21.9,3.5,1.8],
              backgroundColor: [
                `rgb(255, 99, 132)`,
                `rgb(54, 162, 235)`,
                `rgb(255, 205, 86)`,
                `rgb(255, 153, 255)`,
                `rgb(0,0,0)`
              ],
              hoverOffset: 4
        }]
        }
    });
}