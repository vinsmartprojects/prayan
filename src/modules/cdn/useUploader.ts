// utils
import axios from 'src/utils/axios';
export const HOST_CDN_KEY = process.env.HOST_CDN_KEY || '';


export const useUploader = () => {

    async function uploadFile(file: any) {
        const formData = new FormData();
        let result = {}
        formData.append('file', file);
        try {
            const response = await axios.post('/cdn/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
            await response;
            console.log(" response", response)
            if (response?.data) {
                result = { data:{...response?.data?.file} }
            }
            else {
                result = { error: response?.data?.error }
            }

        } catch (error: any) {
            result = { error: error }
        }
        return { ...result }
    };


    function cdnPath(fileName: any) {
        return HOST_CDN_KEY + "/" + fileName
    }

    return { uploadFile ,cdnPath}
}
