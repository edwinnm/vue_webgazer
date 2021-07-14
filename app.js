window.saveDataACrossSessions = true;

var app = new Vue({
    el: "#app",
    data: {
        selected: "fondo",
        photos: ["angular", "laravel", "reactjs", "spring", "svelte", "vuejs"],
        coor: [],
        recording: false,
        heatmap: null,
        screenshot: false,
        subtitle: "Calibra el Web Gazer o selecciona una página.",
    },
    mounted() {
        //webgazer.showVideoPreview(false).showPredictionPoints(false);
        webgazer
            .setGazeListener((points, timestamps) => {
                //console.log(points, timestamps)
                try {
                    this.coor.push([points.x, points.y]);
                    if (this.recording) {
                        this.heatmap.addData({
                            x: points.x,
                            y: points.y,
                            value: 1,
                        });
                    }
                } catch (e) {
                    console.log(e);
                }
            })
            .begin();
    },
    methods: {
        startRecord() {
            this.recording = true;
            this.coor = [];
            this.heatmap = h337.create({
                container: document.querySelector("#heatmapContainer"),
            });
            setTimeout(() => {
                // this.heatmap.setData({ data: [] });
                this.download_csv(this.selected);

                this.recording = false;

                const webGazerContainer = document.getElementById(
                    "webgazerVideoContainer"
                );
                const style = webGazerContainer.getAttribute("style");
                webGazerContainer.setAttribute("style", "display:none;");
                let time = 7;
                let interval = setInterval(() => {
                    console.log(time);
                    time--;
                    this.subtitle = `Vamos toma una captura. Tienes ${time} segundos restantes.`;
                    if (time == 0) {
                        clearInterval(interval);
                    }
                }, 1000);
                setTimeout(() => {
                    webGazerContainer.setAttribute("style", style);
                    this.heatmap.setData({ data: [] });
                    this.screenshot = false;
                    this.subtitle = "Calibra el Web Gazer o selecciona una página.";
                }, time * 1000);
            }, 10000);
            this.coor = [];
        },
        restart() {
            console.log("Se cargó");
            if (this.selected != "fondo") this.startRecord();
        },
        download_csv(name) {
            var csv = "X,Y\n";
            this.coor.forEach(function(row) {
                csv += row.join(",");
                csv += "\n";
            });

            console.log(csv);
            var hiddenElement = document.createElement("a");
            hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
            hiddenElement.target = "_blank";
            hiddenElement.download = name + ".csv";
            hiddenElement.click();
        },
    },
});

//let datos = []
// webgazer.setGazeListener((data, timestamps) => {
//         console.log(data, timestamps)
//         try {
//             datos.push([data.x, data.y])
//         } catch (e) {
//             console.log("configurando");
//         }

//     })
//     .begin()

// fotos = ["amazon", "ebay", "fb", "google", "laarbox", "medium", "twitter", "udemy"]

// let botton = document.querySelector("#btn");
// let contador = 0

// function download_csv(name) {
//     var csv = 'X,Y\n';
//     datos.forEach(function(row) {
//         csv += row.join(',');
//         csv += "\n";
//     });

//     console.log(csv);
//     var hiddenElement = document.createElement('a');
//     hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
//     hiddenElement.target = '_blank';
//     hiddenElement.download = name + '.csv';
//     hiddenElement.click();
// }
// document.querySelector("#btn").addEventListener("click", () => {
//     datos = []
//     setTimeout(function() {
//         if (contador >= fotos.length) {
//             contador = 0
//         }
//         let img = document.querySelector("#foto");
//         img.src = "/images/" + fotos[contador] + ".JPG";
//         download_csv(fotos[contador])
//         datos = []
//         contador = contador + 1;
//     }, 10000);
// })

// fotos.forEach(element => {
//     let select = document.querySelector("#select")
//     let option = document.createElement('option');
//     option.value = element
//     select.appendChild(option)

// });