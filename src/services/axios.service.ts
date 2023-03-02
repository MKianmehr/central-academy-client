import axios from "axios";

const Axios = axios.create({ timeout: 600000 })

export default Axios