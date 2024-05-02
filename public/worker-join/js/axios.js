export const axiosPost = async (url,body) => {

    let uri = document.URL

    uri = uri.split("/")[0];

    let browse = uri + url

    const data = await axios.post(browse , body);

    return data;
}