import axios from "axios";

const Axios = axios.create({ timeout: 100000 })

export default Axios