import apiClient from "./apiClient";

const userService = {
    getUsers: async () => {
        const res = await apiClient.get("/users");
        return res.data;
    },
    getUserById: async (id: string) => {
        const res = await apiClient.get(`/users/${id}`);
        return res.data;
    },
};

export default userService;
