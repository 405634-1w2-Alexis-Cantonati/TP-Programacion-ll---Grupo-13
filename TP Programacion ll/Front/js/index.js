function cargar_vista(url, callback=null) {//parámetro opcional
    fetch(url)
        .then((res) => {
            return res.text()
        })
        .then((txt) => {
            const $panel_content = document.getElementById('panel-content')
            $panel_content.innerHTML = txt
            
            if(callback) //si me pasaron una callback entonces la ejecuto
                callback();
        })
}