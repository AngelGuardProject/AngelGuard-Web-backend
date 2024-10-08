const babys = require("../models/baby");

module.exports = {

    // 애기정보 등록
    createBaby: async function (req, res, next) {
        try {
            const result = await babys.createBaby(req);
            const { user_login_id, baby_id } = result;
            res.status(200).json({ user_login_id: user_login_id, baby_id: baby_id });
        } catch (err) {
            next(err);
        }
    },
    
    //개인 애기정보 조회
    getBabyById: async function (req, res, next) {
        try {
            const { user_login_id, baby_id } = req.params;
            const baby = await babys.getBabyById(user_login_id, baby_id);
            if (baby) {
                res.status(200).json({ baby: baby });
            } else {
                res.status(404).json({ message: "아기를 찾을 수 없습니다." });
            }
        } catch (err) {
            next(err);
        }
    },


    //모든 애기정보 조회
    getAllBabiesByUserId: async function (req, res, next) {
        try {
            const { user_login_id } = req.params;
            const babies = await babys.getAllBabiesByUserId(user_login_id);
            if (babies.length > 0) {
                res.status(200).json({ babies: babies });
            } else {
                res.status(404).json({ message: "아기를 찾을 수 없습니다." });
            }
        } catch (err) {
            next(err);
        }
    },

    //애기정보 수정(조회)
    updateBaby: async function (req, res, next) {
        try {
            const { user_login_id, baby_id } = req.params;
            const baby = await babys.getBabyById(user_login_id, baby_id);
            if (!baby) {
                res.status(404).json({ message: "아기를 찾을 수 없습니다." });
                return;
            }
            res.status(200).json({ baby: baby });   
        } catch (err) {
            next(err);
        }
    },

    //애기정보 수정
    updateBabyProcess: async function (req, res, next) {
        try {
            const { user_login_id, baby_id } = req.params;
            const updateData = req.body;
            await babys.updateBaby(user_login_id, baby_id, updateData);
            const updatedBaby = await babys.getBabyById(user_login_id, baby_id);
            res.status(200).json({ baby: updatedBaby, message: "수정이 완료되었습니다." });
        } catch (err) {
            next(err);
        }
    },



    //애기정보 삭제 
    deleteBaby: async function (req, res, next) {
        try {
            const { user_login_id, baby_id } = req.params;
            const baby = await babys.getBabyById(user_login_id, baby_id);
            if (!baby) {
                res.status(404).json({ message: "아기를 찾을 수 없습니다." });
                return;
            }
            await babys.deleteBaby(user_login_id, baby_id);
            res.status(200).json({ message: "아기 정보가 삭제되었습니다." });
        } catch (err) {
            next(err);
        }
    }
};
