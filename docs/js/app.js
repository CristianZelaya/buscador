import { autos } from './db.js';

const selectMarca         = document.querySelector('#marca'),
      selectYear          = document.querySelector('#year'),
      selectMin           = document.querySelector('#minimo'),
      selectMax           = document.querySelector('#maximo'),
      selectPuertas       = document.querySelector('#puertas'),
      selectTransmision   = document.querySelector('#transmision'),
      selectColor         = document.querySelector('#color'),
      resultado           = document.querySelector('#resultado');

let autoMarca = '',
    autoYear  = '';

// Generar un objeto para busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
};

/* const max = new Date().getFullYear();
const min = max - 10; */

// Eventos
document.addEventListener('DOMContentLoaded', () => {

    mostrarAutos(autos);

    // Llenar marcas
    llenarMarcas();

    // llena opciones de años
    llenarYear();

});

// Eventos para la select de búsquedas
selectMarca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});

selectYear.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
});

selectMin.addEventListener('change', e => {
    datosBusqueda.minimo = parseInt(e.target.value);
    filtrarAuto();
});

selectMax.addEventListener('change', e => {
    datosBusqueda.maximo = parseInt(e.target.value);
    filtrarAuto();
});

selectPuertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
});

selectTransmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});

selectColor.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
});

const mostrarAutos = (autos) => {

    limpiarHtml();

    autos.forEach( (auto, idx) => {

        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        const autoHTML = document.createElement('p');
        autoHTML.innerHTML = `
            ${idx+1}. ${marca} ${modelo} - ${year} - ${puertas} Puertas - Trasmisión: ${transmision} - Precio: $ ${precio} - Color: ${color}
        `;

        resultado.appendChild(autoHTML);

    });

}

const limpiarHtml = () => {

    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

}

const llenarMarcas = () => {

    const marcas = autos.map( auto => {
        return auto.marca;
    });
    
    marcas.sort();
    
    marcas.forEach( marca => {
    
        if ( autoMarca !== marca ){

            const option = document.createElement('option');
            option.value = marca;
            option.innerHTML = marca;
            selectMarca.appendChild(option);
            autoMarca = marca;
        }
    
    });

}

const llenarYear = () => {

    const years = autos.map( auto => {
        return auto.year;
    });
    
    years.sort();
    years.reverse();
    
    years.forEach( year => {
    
        if ( autoYear !== year ){

            const option = document.createElement('option');
            option.value = year;
            option.innerHTML = year;    
            selectYear.appendChild(option);
            autoYear = year;

        }
    
    });

    /* for ( let i = max; i >= min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        selectYear.appendChild(opcion);
    } */

}

const filtrarAuto = () => {

    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMin ).filter( filtrarMax ).filter( filtrarPuertas ).filter( filtrarTrans ).filter( filtrarColor );
    
    if( resultado.length){

        mostrarAutos(resultado);

    } else {
        
        limpiarHtml();
        noResultado();
    }

}

const noResultado = () => {
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.innerHTML = 'No hay resultados, intenta con otros términos de busqueda';

    resultado.appendChild(noResultado);
}

const filtrarMarca = ( auto ) => {

    const { marca } = datosBusqueda;

    if ( marca ){
        return auto.marca === marca;
    }

    return auto;

}

const filtrarYear = ( auto ) => {

    const { year } = datosBusqueda;

    if ( year ){
        return auto.year === year;
    }

    return auto;

}

const filtrarMin = ( auto ) => {

    const { minimo } = datosBusqueda;

    if ( minimo ){
        return auto.precio >= minimo;
    }

    return auto;
}

const filtrarMax = ( auto ) => {

    const { maximo } = datosBusqueda;

    if ( maximo ){
        return auto.precio <= maximo;
    }

    return auto;

}

const filtrarPuertas = ( auto ) => {

    const { puertas } = datosBusqueda;

    if ( puertas ){
        return auto.puertas === puertas;
    }

    return auto;

}

const filtrarTrans = ( auto ) => {

    const { transmision } = datosBusqueda;

    if ( transmision ){
        return auto.transmision === transmision;
    }

    return auto;

}

const filtrarColor = ( auto ) => {

    const { color } = datosBusqueda;

    if ( color ){
        return auto.color === color;
    }

    return auto;

}