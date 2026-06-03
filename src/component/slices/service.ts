import axios from "axios"

const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

export const updateUserPrefrencesService = (role: string, theme: string) => {
    return axios.get(`${baseurl}/${role}/preferences/toggle-theme?theme=${theme}`, { withCredentials: true })
}