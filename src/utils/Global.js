export default class Global{
    static homeRef = null;
    static navRef = null;

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
}