import  axios  from 'axios';

export default class Fetch{

    static  FetchUser =  async (user) => {
        let url = user === ''?'patwapro':user;
        try {
          const response = await axios.get('https://api.github.com/users/'+url);
          return response.data;
        } catch (error) {
            return error.response.data;
        }
      }

}