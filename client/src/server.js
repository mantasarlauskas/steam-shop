import axios from 'axios';

const CLOUDINARY_UPLOAD_PRESET = 'steam-shop';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/mantasarlauskas/image/upload';

export const url = '/api';
export const config = token => ({
	headers: {
		Authorization: `Bearer ${token}`
	}
});
export const uploadImage = logo => {
	let formData = new FormData();
	formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
	formData.append('file', new Blob([logo], {type: 'image/png; image/jpeg'}));
	return axios.post(CLOUDINARY_UPLOAD_URL, formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
};
