import { API_BASE } from '../config'
import axios from 'axios'

export default {
    fetchCart() {
        //return axios.get(API_BASE + '/Cart/GetCart')
        return axios.get('https://api.github.com/users/volkaneligul/repos')
    }
}