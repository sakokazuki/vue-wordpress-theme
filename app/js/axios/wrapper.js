import axios from 'axios';
const http = axios.create( {
	baseURL: _WP.root
} );

export default http;
