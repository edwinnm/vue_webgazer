window.saveDataACrossSessions = true;

var app = new Vue({
    el: '#app',
    data: {
        selected: "",
        photos: ["angular", "laravel", "reactjs", "spring", "svelte", "vuejs"],
        coor: [],
        recording: false,

    },
    mounted() {
        //webgazer.showVideoPreview(false).showPredictionPoints(false);
        webgazer.setGazeListener((data, timestamps) => {
            console.log(data, timestamps)
            try {
                this.coor.push([data.x, data.y])
            } catch (e) {
                console.log("configurando");
            }
        }).begin()


    },
    methods: {

        startRecord() {
            this.recording = true;
            this.coor = []
            setTimeout(() => {
                this.download_csv(this.selected)
                this.recording = false;
            }, 10000);
            this.coor = []
        },

        download_csv(name) {
            var csv = 'X,Y\n';
            this.coor.forEach(function(row) {
                csv += row.join(',');
                csv += "\n";
            });

            console.log(csv);
            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            hiddenElement.target = '_blank';
            hiddenElement.download = name + '.csv';
            hiddenElement.click();
        }
    }
})


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