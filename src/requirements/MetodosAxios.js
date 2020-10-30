import axios from "axios";
import {API_URL} from "../Constants";

export default class MetodosAxios {
  static instanceAxios = axios.create({
	 baseURL: API_URL
  });


}
