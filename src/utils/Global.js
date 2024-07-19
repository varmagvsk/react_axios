export default class Global{
    static homeRef = null;
    static navRef = null;
    static productsRef = null;

    static getHomeRef=()=>{
        return this.homeRef;
    }

    static setHomeRef=(ref)=>{
        this.homeRef = ref;
    }

    static getNavRef=()=>{
        return this.navRef;
    }

    static setNavRef=(ref)=>{
        this.navRef = ref;
    }

    static getProductsRef=()=>{
        return this.productsRef;
    }

    static setProductsRef=(ref)=>{
        this.productsRef = ref;
    }

    static appTheme = {
        colors:{
            primaryColor: "#ff3269",
            btnBgColor: "#ff32691a",
        },
        fonts:{
            primartFont: 'Roboto',
            secondartFont: 'sans-serif'
        }
    }
}