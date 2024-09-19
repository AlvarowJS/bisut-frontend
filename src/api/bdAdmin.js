import axios from 'axios'

const bdAdmin = axios.create({
     baseURL: 'https://bisut.tms2.nuvola7.com.mx/api'
})

export default bdAdmin