const { exec, escape } = require('../db/mysql')
const getList = async (author, keyword)=>{
    author = author ? escape(author) : ''
    //格式正确的数据
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author=${author} `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    return await exec(sql)
}
const getDetail = async (id) => {
    //假数据
    const sql = `select * from blogs where id='${id}';`
    const rows = await exec(sql)
    return rows[0]
    // return await exec(sql).then(rows => {
    //     return rows[0]
    // })
}
const newBlog = async (blogData = {}) => {
    //blogData 是一个博客对象 包含 title content 属性
    const title = escape(blogData.title)
    const content = escape(blogData.content)
    const createtime = Date.now()
    const author = escape(blogData.author)
    const sql = `
        insert into blogs (title, content, createtime, author) values (${title}, ${content}, ${createtime}, ${author});
    `
    const insertData = await exec(sql)
    return {
        id: insertData.insertId
    }
    // return await exec(sql).then(insertData => {
    //     return {
    //         id: insertData.insertId
    //     }
    // })
}
const updateBlog = async (id, blogData = {})=>{
    // console.log('update blog', id, blogData)
    const title = escape(blogData.title)
    const content = escape(blogData.content)
    const sql = `
        update blogs set title=${title},content=${content} where id=${id}
    `
    const updateData = exec(sql)
    if (updateData.affectedRows >0) {
        return true
    }
    return false
    // return await exec(sql).then(updateData =>{
    //     // console.log(updateData)
    //     if (updateData.affectedRows >0) {
    //         return true
    //     }
    //     return false
    // })
}
const delBlog = async (id, author) => {
    const sql = `delete from blogs where id='${id}' and author='${author}';`
    const delData = await exec(sql)
    if (delData.affectedRows > 0) {
        return true
    }
    return false
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}