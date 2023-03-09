import axios from 'src/utils/axios';

export const useSetting = () => {
  async function create(params: any) {
    let result: any = null;
    try {
      const response = await axios.post('/settings', {
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
      const response = await axios.patch('/settings/' + id, {
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
      const response = await axios.get('/settings');
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

  async function getManyWithFilters(filter: any) {
    let result: any = null;
    try {
      const response = await axios.post('/settings/filter', {
        ...filter
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

  async function search(params: any) {
    let result: any = null;
    try {
      const response = await axios.post('/settings/search', {
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
      const response = await axios.get('/settings/' + id);
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
      const response = await axios.delete('/settings/' + id, {});
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
      const response = await axios.post('/settings/', {
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
    getManyWithFilters,
    search,
  };
};
