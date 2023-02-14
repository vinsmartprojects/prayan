import axios from 'src/utils/axios';

export const useVehicletype = () => {
  async function create(params: any) {
    let result: any = null;
    try {
      const response = await axios.post('/vehicles-type', {
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
      const response = await axios.patch('/vehicles-type/' + id, {
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
      const response = await axios.get('/vehicles-type');
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
      const response = await axios.post('/vehicles-type/search', {
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
      const response = await axios.get('/vehicles-type/' + id);
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
      const response = await axios.delete('/vehicles-type/' + id, {});
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
      const response = await axios.post('/vehicles-type/', {
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
