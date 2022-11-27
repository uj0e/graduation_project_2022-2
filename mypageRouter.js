module.exports = (app) => {
    const express = require("express");
    const client = require('./database');
    const router = express.Router();

    router.get("/", (req, res) => {
        console.log("마이페이지");
        var session_logined = req.session.is_logined;
        console.log(session_logined);
        if (req.session.is_logined == true) {
            client.query(
                "select * from product join client on product.id = client.id where product.id =?",
                [req.session.client_id],
                (err, rows) => {
                    res.render("bussiness_main",{
                        data : "hello",
                        rows : rows,
                    });
                });
        } else {
            res.redirect("/login");
        }
    });

    // 마이페이지 수정
    router.post("/update", (req, res) => {
        const body = req.body;
        const business_name = body.business_name;
        const password = body.password;
        const password_answer = body.password_answer;
        const address = body.address;
        const e_mail = body.e_mail;
        const phone_number = body.phone_number;
        const account_num = body.account_num;
        const id = req.session.client_id;

        client.query("update client set business_name = ?, password = ?, password_answer = ?, address = ?, e_mail = ?, phone_number = ?, account_num = ?  where id = '" + id + "'", [
            business_name,
            password,
            password_answer,
            address,
            e_mail,
            phone_number,
            account_num,
        ], (error, result) => {
            if (error) {
                throw error;
            } else {
                res.redirect("/mypage");
            }
        });
    });

    return router;

}

// if (rows[0].division == "1") {
//     res.render("bussiness_main", {
//         division: rows[0].division,
//         business_name: rows[0].business_name,
//         business_num: rows[0].business_num,
//         field: rows[0].field,
//         name: rows[0].name,
//         id: rows[0].id,
//         password: rows[0].password,
//         password_question: rows[0].password_question,
//         password_answer: rows[0].password_answer,
//         address: rows[0].address,
//         e_mail: rows[0].e_mail,
//         phone_number: rows[0].phone_number,
//         account_num: rows[0].account_num,
//         session : req.session.is_logined,
//         image : rows[0].image,
//         title : rows[1].title,
//         start : rows[1].start,
//         end : rows[1].end,
//         name2 : rows[1].name,
//         count : rows[1].count,
//         price : rows[1].price,
//         rows : rows,
//     });
// } else if (rows[0].division == "2") {
//     res.render("bussiness_main", {
//         division: rows[0].division,
//         name: rows[0].name,
//         id: rows[0].id,
//         password: rows[0].password,
//         password_question: rows[0].password_question,
//         password_answer: rows[0].password_answer,
//         address: rows[0].address,
//         e_mail: rows[0].e_mail,
//         phone_number: rows[0].phone_number,
//         session : req.session.is_logined,
//     });
// }