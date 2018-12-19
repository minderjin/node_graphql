/**
 * Created by lenovo on 2017-06-20.
 */
var conn_pool = {};

var init = function (pool) {
    console.log('model.init() 호출됨.');
    conn_pool = pool;
};

var getUser = function(id, callback) {
    console.log('model.getUser() 호출됨.');

    if(conn_pool) {
        // 커넥션 풀에서 연결 객체를 가져옵니다.
        conn_pool.getConnection(function (err, conn) {
            if (err) {
                if (conn) {
                    conn.release(); // 반드시 해제해야 합니다.
                }
                callback(err, null);
                return;
            }
            console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

            var sql = 'select ?? from ??';
            var columns = ['id', 'name', 'tel', 'company'];
            var tablename = 'user';

            var params = [];
            params.push(columns);
            params.push(tablename);
            if (id) {
                params.push(id);
                sql = 'select ?? from ?? where id = ?';
            }


            // SQL문을 실행합니다.
            var exec = conn.query(sql, params, function (err, rows) {
                conn.release(); //반드시 해제해야 합니다.
                console.log('실행 대상 SQL : ' + exec.sql);

                if (rows.length > 0) {
                    console.log('ID [%s]와 일치하는 User 찾음.', id);
                    callback(null, rows);
                } else {
                    console.log('일치하는 User를 찾지 못함.');
                    callback(null, null);
                }
            });
        });
    }
    else {
        //TODO
        console.log('conn_pool is not defined.');
    }
};

var getCompany = function(compId, callback) {
    console.log('model.getCompany() 호출됨.');

    if(conn_pool) {
        // 커넥션 풀에서 연결 객체를 가져옵니다.
        conn_pool.getConnection(function (err, conn) {
            if (err) {
                if (conn) {
                    conn.release(); // 반드시 해제해야 합니다.
                }
                callback(err, null);
                return;
            }
            console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

            var sql = 'select ?? from ??';
            var columns = ['id', 'name', 'corp_number'];
            var tablename = 'company';

            var params = [];
            params.push(columns);
            params.push(tablename);
            if (compId) {
                params.push(compId);
                sql = 'select ?? from ?? where id = ?';
            }


            // SQL문을 실행합니다.
            var exec = conn.query(sql, params, function (err, rows) {
                conn.release(); //반드시 해제해야 합니다.
                console.log('실행 대상 SQL : ' + exec.sql);

                if (rows.length > 0) {
                    console.log('ID [%s]와 일치하는 Company 찾음.', compId);
                    callback(null, rows);
                } else {
                    console.log('일치하는 Company를 찾지 못함.');
                    callback(null, null);
                }
            });
        });
    }
    else {
        //TODO
        console.log('conn_pool is not defined.');
    }
};


module.exports.init = init;
module.exports.getUser = getUser;
module.exports.getCompany = getCompany;