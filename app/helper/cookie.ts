export function setCookie(name:string, value:string, days:number) {
    let expires = "";
    if (days) {
        const data = new Date()
        data.setTime(data.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + data.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}