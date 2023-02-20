import axios from "axios";

const Axios = axios.create({ timeout: 500000 })

export default Axios