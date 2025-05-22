const BASE_URL = 'https://localhost:7132/api';

function getUsers() {
    return fetch(BASE_URL + "/User").then(response => response.json());
}

export function login(email, password) {
    const payload = {
        email: email,
        password: password
    };

    return fetch(BASE_URL + "/User/LoginUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Login request failed");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.error("Login error:", error);
            throw error;
        });
}

export function register(email,password,firstname,lastname){
    return fetch(BASE_URL + "/User/CreateUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("registreren failed");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.error("Register error:", error);
            throw error;
        });
}
export function changePass(email) {

    return fetch(BASE_URL + "/User/ChangePass", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Change password request failed");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.error("Change password error:", error);
            throw error;
        });
}
export async function aboGet() {
    try {
        const response = await fetch(BASE_URL+"/Product/GetProducts?productType=subscriptions")
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch subscriptions:", error);
        return null;
    }
}
export async function ExeGet() {
    try {
        const response = await fetch(BASE_URL+"/Product/GetProducts?productType=excercises")
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch subscriptions:", error);
        return null;
    }
}

export async function userGet() {
    const email = localStorage.getItem("email");
    try {
        const response = await fetch(`${BASE_URL}/GetOwnUser/email?email=${encodeURIComponent(email)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        return null;
    }
}
export async function orderHistoryGet(id) {
    try {
        const response = await fetch(`${BASE_URL}/Order/GetOrdersByCustomerId?page=-1&id=${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return null;
    }
}

export async function orderItems(id){
    try {
        const response = await fetch(`${BASE_URL}/Order/GetOrderWithItems?Orderid=${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        return null;
    }
}
    export async function getItemDetail(type,id){
        try {
            const response = await fetch(`${BASE_URL}/Order/GetItemDetails?productType=${type}&id=${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch user:", error);
            return null;
        }
    }
    export async function ExeGetSport(sport) {
        try {
            const response = await fetch(`${BASE_URL}/Product/GetProducts?productType=excercises&Sport=${sport}`)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch subscriptions:", error);
            return null;
        }
    }
export async function CreateOrder(customerId, orderDate, productDictionary) {
    const payload = {
        customerId,
        status: "Paid",
        orderDate,
        productDictionary // ✅ correct key name!
    };

    return fetch(BASE_URL + "/Order/CreateOrder", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("CreateOrder request failed");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Order created:", data);
            return data;
        })
        .catch((error) => {
            console.error("CreateOrder error:", error);
            throw error;
        });
}

export async function ExeGetOneSport(sport,id) {
    try {
        const response = await fetch(`${BASE_URL}/Product/GetProducts?productType=excercises&Sport=${sport}&Id=${id}`)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch subscriptions:", error);
        return null;
    }
}
export default {
    getUsers,
    login,
    register,
    changePass,
    aboGet,
    ExeGet,
    userGet,
    ExeGetSport,
    orderHistoryGet,
    orderItems,
    getItemDetail,
    CreateOrder,
    ExeGetOneSport
};
