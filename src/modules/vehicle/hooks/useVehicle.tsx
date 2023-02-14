import axios from 'src/utils/axios';

export const useVehicle = () => {
  async function create(params: any) {
    let result: any = null;
    try {
      const response = await axios.post('/vehicles', {
        ...params,
      });
      await response;
      if (response?.data?.data) {
        result = { data: response?.data?.data };
      } else {
        result = { error: response?.data?.error };
      }
    } catch (error: any) {
      result = { error: error };
    }
    return { ...result };
  }

  async function update(id: any, data: any) {
    let result: any = null;
    try {
      const response = await axios.patch('/vehicles/' + id, {
        ...data,
      });
      await response;
      if (response?.data?.data) {
        result = { data: response?.data?.data };
      } else {
        result = { error: response?.data?.error };
      }
    } catch (error: any) {
      result = { error: error };
    }
    return { ...result };
  }

  async function getMany() {
    let result: any = null;
    try {
      const response = await axios.get('/vehicles');
      await response;
      if (response?.data?.data) {
        result = { data: response?.data?.data };
      } else {
        result = { error: response?.data?.error };
      }
    } catch (error: any) {
      result = { error: error };
    }
    return { ...result };
  }

  async function search(params: any) {
    let result: any = null;
    try {
      const response = await axios.post('/vehicles/search', {
        ...params,
      });
      await response;
      if (response?.data?.data) {
        result = { data: response?.data?.data };
      } else {
        result = { error: response?.data?.error };
      }
    } catch (error: any) {
      result = { error: error };
    }
    return { ...result };
  }

  async function get(id: any) {
    let result: any = null;
    try {
      const response = await axios.get('/vehicles/' + id);
      await response;
      if (response?.data?.data) {
        result = { data: response?.data?.data };
      } else {
        result = { error: response?.data?.error };
      }
    } catch (error: any) {
      result = { error: error };
    }
    return { ...result };
  }
  async function remove(id: any) {
    let result: any = null;
    try {
      const response = await axios.delete('/vehicles/' + id, {});
      await response;
      if (response?.data?.data) {
        result = { data: response?.data?.data };
      } else {
        result = { error: response?.data?.error };
      }
    } catch (error: any) {
      result = { error: error };
    }
    return { ...result };
  }

  async function deleteMany(ids: any) {
    let result: any = null;
    try {
      const response = await axios.post('/vehicles/', {
        data: { ids: ids },
      });
      await response;
      if (response?.data?.data) {
        result = { data: response?.data?.data };
      } else {
        result = { error: response?.data?.error };
      }
    } catch (error: any) {
      result = { error: error };
    }
    return { ...result };
  }
  return {
    create,
    get,
    update,
    getMany,
    remove,
    deleteMany,

    search,
  };
};
