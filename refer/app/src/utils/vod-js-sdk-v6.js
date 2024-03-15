let TcVod = null;
!function(e, t) {
    TcVod = t();
}(window, (function() {
    return function(e) {
        var t = {};
        function n(r) {
            if (t[r])
                return t[r].exports;
            var o = t[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(o.exports, o, o.exports, n),
            o.l = !0,
            o.exports;
        }
        return n.m = e,
        n.c = t,
        n.d = function(e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: r
            });
        }
        ,
        n.r = function(e) {
            'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: 'Module'
            }),
            Object.defineProperty(e, '__esModule', {
                value: !0
            });
        }
        ,
        n.t = function(e, t) {
            if (1 & t && (e = n(e)),
            8 & t)
                return e;
            if (4 & t && 'object' == typeof e && e && e.__esModule)
                return e;
            var r = Object.create(null);
            if (n.r(r),
            Object.defineProperty(r, 'default', {
                enumerable: !0,
                value: e
            }),
            2 & t && 'string' != typeof e)
                for (var o in e)
                    n.d(r, o, function(t) {
                        return e[t];
                    }
                        .bind(null, o));
            return r;
        }
        ,
        n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default;
            }
                : function() {
                    return e;
                }
            ;
            return n.d(t, 'a', t),
            t;
        }
        ,
        n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }
        ,
        n.p = '',
        n(n.s = 0);
    }([function(e, t, n) {
        'use strict';
        var r = this && this.__assign || function() {
            return (r = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e;
            }
            ).apply(this, arguments);
        }
        ;
        Object.defineProperty(t, '__esModule', {
            value: !0
        });
        var o = n(1)
            , i = n(50)
            , a = function() {
                function e(e) {
                    this.allowReport = !0,
                    this.enableResume = !0,
                    this.getSignature = e.getSignature,
                    void 0 !== e.allowReport && (this.allowReport = e.allowReport),
                    void 0 !== e.enableResume && (this.enableResume = e.enableResume),
                    this.appId = e.appId,
                    this.reportId = e.reportId;
                }
                return e.prototype.upload = function(e) {
                    var t = r({
                            getSignature: this.getSignature,
                            appId: this.appId,
                            reportId: this.reportId,
                            enableResume: this.enableResume
                        }, e)
                        , n = new o.default(t);
                    return this.allowReport && this.initReporter(n),
                    n.start(),
                    n;
                }
                ,
                e.prototype.initReporter = function(e) {
                    new i.VodReporter(e);
                }
                ,
                e;
            }();
        t.default = a;
    }
    , function(e, t, n) {
        'use strict';
        var r, o = this && this.__extends || (r = function(e, t) {
                return (r = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t;
                }
            || function(e, t) {
                for (var n in t)
                    t.hasOwnProperty(n) && (e[n] = t[n]);
            }
                )(e, t);
            }
            ,
            function(e, t) {
                function n() {
                    this.constructor = e;
                }
                r(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n);
            }
            ), i = this && this.__assign || function() {
                return (i = Object.assign || function(e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++)
                        for (var o in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e;
                }
                ).apply(this, arguments);
            }
            , a = this && this.__awaiter || function(e, t, n, r) {
                return new (n || (n = Promise))((function(o, i) {
                    function a(e) {
                        try {
                            c(r.next(e));
                        } catch (e) {
                            i(e);
                        }
                    }
                    function s(e) {
                        try {
                            c(r.throw(e));
                        } catch (e) {
                            i(e);
                        }
                    }
                    function c(e) {
                        var t;
                        e.done ? o(e.value) : (t = e.value,
                        t instanceof n ? t : new n((function(e) {
                            e(t);
                        }
                        ))).then(a, s);
                    }
                    c((r = r.apply(e, t || [])).next());
                }
                ));
            }
            , s = this && this.__generator || function(e, t) {
                var n, r, o, i, a = {
                    label: 0,
                    sent: function() {
                        if (1 & o[0])
                            throw o[1];
                        return o[1];
                    },
                    trys: [],
                    ops: []
                };
                return i = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                },
                'function' == typeof Symbol && (i[Symbol.iterator] = function() {
                    return this;
                }
                ),
                i;
                function s(i) {
                    return function(s) {
                        return function(i) {
                            if (n)
                                throw new TypeError('Generator is already executing.');
                            for (; a; )
                                try {
                                    if (n = 1,
                                    r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
                                    0) : r.next) && !(o = o.call(r, i[1])).done)
                                        return o;
                                    switch (r = 0,
                                    o && (i = [2 & i[0], o.value]),
                                    i[0]) {
                                        case 0:
                                        case 1:
                                            o = i;
                                            break;
                                        case 4:
                                            return a.label++,
                                            {
                                                value: i[1],
                                                done: !1
                                            };
                                        case 5:
                                            a.label++,
                                            r = i[1],
                                            i = [0];
                                            continue;
                                        case 7:
                                            i = a.ops.pop(),
                                            a.trys.pop();
                                            continue;
                                        default:
                                            if (!(o = a.trys,
                                            (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                                a = 0;
                                                continue;
                                            }
                                            if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                                a.label = i[1];
                                                break;
                                            }
                                            if (6 === i[0] && a.label < o[1]) {
                                                a.label = o[1],
                                                o = i;
                                                break;
                                            }
                                            if (o && a.label < o[2]) {
                                                a.label = o[2],
                                                a.ops.push(i);
                                                break;
                                            }
                                            o[2] && a.ops.pop(),
                                            a.trys.pop();
                                            continue;
                                    }
                                    i = t.call(e, a);
                                } catch (e) {
                                    i = [6, e],
                                    r = 0;
                                } finally {
                                    n = o = 0;
                                }
                            if (5 & i[0])
                                throw i[1];
                            return {
                                value: i[0] ? i[1] : void 0,
                                done: !0
                            };
                        }([i, s]);
                    };
                }
            }
        ;
        Object.defineProperty(t, '__esModule', {
            value: !0
        }),
        t.UploaderEvent = t.vodAxios = void 0;
        var c, u = n(2), l = n(6), d = n(23), p = n(24), f = n(49), h = n(50), m = n(52);
        t.vodAxios = p.default.create(),
        function(e) {
            e.video_progress = 'video_progress',
            e.media_progress = 'media_progress',
            e.video_upload = 'video_upload',
            e.media_upload = 'media_upload',
            e.cover_progress = 'cover_progress',
            e.cover_upload = 'cover_upload';
        }(c = t.UploaderEvent || (t.UploaderEvent = {}));
        var g = function(e) {
            function n(t) {
                var n = e.call(this) || this;
                return n.sessionName = '',
                n.vodSessionKey = '',
                n.appId = 0,
                n.reqKey = m(),
                n.reportId = '',
                n.enableResume = !0,
                n.applyRequestTimeout = 5e3,
                n.applyRequestRetryCount = 3,
                n.commitRequestTimeout = 5e3,
                n.commitRequestRetryCount = 3,
                n.retryDelay = 1e3,
                n.validateInitParams(t),
                n.videoFile = t.mediaFile || t.videoFile,
                n.getSignature = t.getSignature,
                n.enableResume = t.enableResume,
                n.videoName = t.mediaName || t.videoName,
                n.coverFile = t.coverFile,
                n.fileId = t.fileId,
                n.applyRequestTimeout = t.applyRequestTimeout || n.applyRequestTimeout,
                n.commitRequestTimeout = t.commitRequestTimeout || n.commitRequestTimeout,
                n.retryDelay = t.retryDelay || n.retryDelay,
                n.appId = t.appId || n.appId,
                n.reportId = t.reportId || n.reportId,
                n.genFileInfo(),
                n;
            }
            return o(n, e),
            n.prototype.setStorage = function(e, t) {
                if (e) {
                    var n = 'webugc_' + u(e);
                    try {
                        localStorage.setItem(n, t);
                    } catch (e) {}
                }
            }
            ,
            n.prototype.getStorage = function(e) {
                if (e) {
                    var t = 'webugc_' + u(e)
                        , n = null;
                    try {
                        n = localStorage.getItem(t);
                    } catch (e) {}
                    return n;
                }
            }
            ,
            n.prototype.delStorage = function(e) {
                if (e) {
                    var t = 'webugc_' + u(e);
                    try {
                        localStorage.removeItem(t);
                    } catch (e) {}
                }
            }
            ,
            n.prototype.validateInitParams = function(e) {
                if (!f.default.isFunction(e.getSignature))
                    throw new Error('getSignature must be a function');
                if (e.videoFile && !f.default.isFile(e.videoFile))
                    throw new Error('videoFile must be a File');
            }
            ,
            n.prototype.genFileInfo = function() {
                var e = this.videoFile;
                if (e) {
                    var t = e.name.lastIndexOf('.')
                        , n = '';
                    if (this.videoName) {
                        if (!f.default.isString(this.videoName))
                            throw new Error('mediaName must be a string');
                        if (/[:*?<>\"\\/|]/g.test(this.videoName))
                            throw new Error('Cant use these chars in filename: \\ / : * ? " < > |');
                        n = this.videoName;
                    } else
                        n = e.name.substring(0, t);
                    this.videoInfo = {
                        name: n,
                        type: e.name.substring(t + 1).toLowerCase(),
                        size: e.size
                    },
                    this.sessionName += e.name + '_' + e.size + ';';
                }
                var r = this.coverFile;
                if (r) {
                    var o = r.name
                        , i = o.lastIndexOf('.');
                    this.coverInfo = {
                        name: o.substring(0, i),
                        type: o.substring(i + 1).toLowerCase(),
                        size: r.size
                    },
                    this.sessionName += r.name + '_' + r.size + ';';
                }
            }
            ,
            n.prototype.applyUploadUGC = function(e) {
                return void 0 === e && (e = 0),
                a(this, void 0, void 0, (function() {
                    function n(t) {
                        return a(this, void 0, void 0, (function() {
                            return s(this, (function(n) {
                                switch (n.label) {
                                    case 0:
                                        if (r.emit(h.VodReportEvent.report_apply, {
                                            err: t,
                                            requestStartTime: d
                                        }),
                                        r.delStorage(r.sessionName),
                                        r.applyRequestRetryCount == e) {
                                            if (t)
                                                throw t;
                                            throw new Error('apply upload failed');
                                        }
                                        return [4, f.default.delay(r.retryDelay)];
                                    case 1:
                                        return n.sent(),
                                        [2, r.applyUploadUGC(e + 1)];
                                }
                            }
                            ));
                        }
                        ));
                    }
                    var r, o, i, c, u, l, d, p, m, g, y, v;
                    return s(this, (function(e) {
                        switch (e.label) {
                            case 0:
                                return r = this,
                                [4, this.getSignature()];
                            case 1:
                                if (o = e.sent(),
                                c = this.videoInfo,
                                u = this.coverInfo,
                                l = this.vodSessionKey || this.enableResume && this.getStorage(this.sessionName))
                                    i = {
                                        signature: o,
                                        vodSessionKey: l
                                    };
                                else if (c)
                                    i = {
                                        signature: o,
                                        videoName: c.name,
                                        videoType: c.type,
                                        videoSize: c.size
                                    },
                                    u && (i.coverName = u.name,
                                    i.coverType = u.type,
                                    i.coverSize = u.size);
                                else {
                                    if (!this.fileId || !u)
                                        throw 'Wrong params, please check and try again';
                                    i = {
                                        signature: o,
                                        fileId: this.fileId,
                                        coverName: u.name,
                                        coverType: u.type,
                                        coverSize: u.size
                                    };
                                }
                                d = new Date,
                                e.label = 2;
                            case 2:
                                return e.trys.push([2, 4, , 5]),
                                [4, t.vodAxios.post('https://vod2.qcloud.com/v3/index.php?Action=ApplyUploadUGC', i, {
                                    timeout: this.applyRequestTimeout,
                                    withCredentials: !1
                                })];
                            case 3:
                                return p = e.sent(),
                                [3, 5];
                            case 4:
                                return [2, n(e.sent())];
                            case 5:
                                return 0 == (m = p.data).code ? (g = m.data,
                                y = g.vodSessionKey,
                                this.setStorage(this.sessionName, y),
                                this.vodSessionKey = y,
                                this.appId = g.appId,
                                this.emit(h.VodReportEvent.report_apply, {
                                    data: g,
                                    requestStartTime: d
                                }),
                                [2, g]) : ((v = new Error(m.message)).code = m.code,
                                [2, n(v)]);
                        }
                    }
                    ));
                }
                ));
            }
            ,
            n.prototype.uploadToCos = function(e) {
                return a(this, void 0, void 0, (function() {
                    var t, n, r, o, u, d, p, m;
                    return s(this, (function(g) {
                        switch (g.label) {
                            case 0:
                                return t = this,
                                n = {
                                    bucket: e.storageBucket + '-' + e.storageAppId,
                                    region: e.storageRegionV5
                                },
                                r = new l({
                                    getAuthorization: function(t, n) {
                                        return a(this, void 0, void 0, (function() {
                                            return s(this, (function(t) {
                                                return n({
                                                    TmpSecretId: e.tempCertificate.secretId,
                                                    TmpSecretKey: e.tempCertificate.secretKey,
                                                    XCosSecurityToken: e.tempCertificate.token,
                                                    StartTime: e.timestamp,
                                                    ExpiredTime: e.tempCertificate.expiredTime
                                                }),
                                                [2];
                                            }
                                            ));
                                        }
                                        ));
                                    }
                                }),
                                this.cos = r,
                                o = [],
                                this.videoFile && (u = i(i({}, n), {
                                    file: this.videoFile,
                                    key: e.video.storagePath,
                                    onProgress: function(e) {
                                        t.emit(c.video_progress, e),
                                        t.emit(c.media_progress, e);
                                    },
                                    onUpload: function(e) {
                                        t.emit(c.video_upload, e),
                                        t.emit(c.media_upload, e);
                                    },
                                    onTaskReady: function(e) {
                                        t.taskId = e;
                                    }
                                }),
                                o.push(u)),
                                this.coverFile && (d = i(i({}, n), {
                                    file: this.coverFile,
                                    key: e.cover.storagePath,
                                    onProgress: function(e) {
                                        t.emit(c.cover_progress, e);
                                    },
                                    onUpload: function(e) {
                                        t.emit(c.cover_upload, e);
                                    },
                                    onTaskReady: f.default.noop
                                }),
                                o.push(d)),
                                p = new Date,
                                m = o.map((function(e) {
                                    return new Promise((function(n, o) {
                                        r.sliceUploadFile({
                                            Bucket: e.bucket,
                                            Region: e.region,
                                            Key: e.key,
                                            Body: e.file,
                                            onTaskReady: e.onTaskReady,
                                            onProgress: e.onProgress
                                        }, (function(r, i) {
                                            return e.file === t.videoFile && t.emit(h.VodReportEvent.report_cos_upload, {
                                                err: r,
                                                requestStartTime: p
                                            }),
                                            r ? (t.delStorage(t.sessionName),
                                            '{"error":"error","headers":{}}' === JSON.stringify(r) ? o(new Error('cors error')) : void o(r)) : (e.onUpload(i),
                                            n());
                                        }
                                        ));
                                    }
                                    ));
                                }
                                )),
                                [4, Promise.all(m)];
                            case 1:
                                return [2, g.sent()];
                        }
                    }
                    ));
                }
                ));
            }
            ,
            n.prototype.commitUploadUGC = function(e) {
                return void 0 === e && (e = 0),
                a(this, void 0, void 0, (function() {
                    function n(t) {
                        return a(this, void 0, void 0, (function() {
                            return s(this, (function(n) {
                                switch (n.label) {
                                    case 0:
                                        if (r.emit(h.VodReportEvent.report_commit, {
                                            err: t,
                                            requestStartTime: c
                                        }),
                                        r.commitRequestRetryCount == e) {
                                            if (t)
                                                throw t;
                                            throw new Error('commit upload failed');
                                        }
                                        return [4, f.default.delay(r.retryDelay)];
                                    case 1:
                                        return n.sent(),
                                        [2, r.commitUploadUGC(e + 1)];
                                }
                            }
                            ));
                        }
                        ));
                    }
                    var r, o, i, c, u, l, d;
                    return s(this, (function(e) {
                        switch (e.label) {
                            case 0:
                                return r = this,
                                [4, this.getSignature()];
                            case 1:
                                o = e.sent(),
                                this.delStorage(this.sessionName),
                                i = this.vodSessionKey,
                                c = new Date,
                                e.label = 2;
                            case 2:
                                return e.trys.push([2, 4, , 5]),
                                [4, t.vodAxios.post('https://vod2.qcloud.com/v3/index.php?Action=CommitUploadUGC', {
                                    signature: o,
                                    vodSessionKey: i
                                }, {
                                    timeout: this.commitRequestTimeout,
                                    withCredentials: !1
                                })];
                            case 3:
                                return u = e.sent(),
                                [3, 5];
                            case 4:
                                return [2, n(e.sent())];
                            case 5:
                                return 0 == (l = u.data).code ? (this.emit(h.VodReportEvent.report_commit, {
                                    data: l.data,
                                    requestStartTime: c
                                }),
                                [2, l.data]) : ((d = new Error(l.message)).code = l.code,
                                [2, n(d)]);
                        }
                    }
                    ));
                }
                ));
            }
            ,
            n.prototype.start = function() {
                var e = this
                    , t = new Date;
                this.donePromise = this._start().then((function(n) {
                    return e.emit(h.VodReportEvent.report_done, {
                        err: {
                            code: 0
                        },
                        requestStartTime: t
                    }),
                    n;
                }
                )).catch((function(n) {
                    throw e.emit(h.VodReportEvent.report_done, {
                        err: {
                            code: n && n.code || f.default.CLIENT_ERROR_CODE.UPLOAD_FAIL
                        },
                        requestStartTime: t
                    }),
                    n;
                }
                ));
            }
            ,
            n.prototype._start = function() {
                return a(this, void 0, void 0, (function() {
                    var e;
                    return s(this, (function(t) {
                        switch (t.label) {
                            case 0:
                                return [4, this.applyUploadUGC()];
                            case 1:
                                return e = t.sent(),
                                [4, this.uploadToCos(e)];
                            case 2:
                                return t.sent(),
                                [4, this.commitUploadUGC()];
                            case 3:
                                return [2, t.sent()];
                        }
                    }
                    ));
                }
                ));
            }
            ,
            n.prototype.done = function() {
                return this.donePromise;
            }
            ,
            n.prototype.cancel = function() {
                this.cos.cancelTask(this.taskId);
            }
            ,
            n;
        }(d.EventEmitter);
        t.default = g;
    }
    , function(module, exports, __webpack_require__) {
        (function(process, global) {
            var __WEBPACK_AMD_DEFINE_RESULT__;
            /*
 * [js-sha1]{@link https://github.com/emn178/js-sha1}
 *
 * @version 0.6.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
            !function() {
                'use strict';
                var root = 'object' == typeof window ? window : {}
                    , NODE_JS = !root.JS_SHA1_NO_NODE_JS && 'object' == typeof process && process.versions && process.versions.node;
                NODE_JS && (root = global);
                var COMMON_JS = !root.JS_SHA1_NO_COMMON_JS && 'object' == typeof module && module.exports
                    , AMD = __webpack_require__(5)
                    , HEX_CHARS = '0123456789abcdef'.split('')
                    , EXTRA = [-2147483648, 8388608, 32768, 128]
                    , SHIFT = [24, 16, 8, 0]
                    , OUTPUT_TYPES = ['hex', 'array', 'digest', 'arrayBuffer']
                    , blocks = []
                    , createOutputMethod = function(e) {
                        return function(t) {
                            return new Sha1(!0).update(t)[e]();
                        };
                    }
                    , createMethod = function() {
                        var e = createOutputMethod('hex');
                        NODE_JS && (e = nodeWrap(e)),
                        e.create = function() {
                            return new Sha1;
                        }
                        ,
                        e.update = function(t) {
                            return e.create().update(t);
                        }
                        ;
                        for (var t = 0; t < OUTPUT_TYPES.length; ++t) {
                            var n = OUTPUT_TYPES[t];
                            e[n] = createOutputMethod(n);
                        }
                        return e;
                    }
                    , nodeWrap = function(method) {
                        var crypto = eval('require(\'crypto\')')
                            , Buffer = eval('require(\'buffer\').Buffer')
                            , nodeMethod = function(e) {
                                if ('string' == typeof e)
                                    return crypto.createHash('sha1').update(e, 'utf8').digest('hex');
                                if (e.constructor === ArrayBuffer)
                                    e = new Uint8Array(e);
                                else if (void 0 === e.length)
                                    return method(e);
                                return crypto.createHash('sha1').update(new Buffer(e)).digest('hex');
                            };
                        return nodeMethod;
                    };
                function Sha1(e) {
                    e ? (blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0,
                    this.blocks = blocks) : this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    this.h0 = 1732584193,
                    this.h1 = 4023233417,
                    this.h2 = 2562383102,
                    this.h3 = 271733878,
                    this.h4 = 3285377520,
                    this.block = this.start = this.bytes = this.hBytes = 0,
                    this.finalized = this.hashed = !1,
                    this.first = !0;
                }
                Sha1.prototype.update = function(e) {
                    if (!this.finalized) {
                        var t = 'string' != typeof e;
                        t && e.constructor === root.ArrayBuffer && (e = new Uint8Array(e));
                        for (var n, r, o = 0, i = e.length || 0, a = this.blocks; o < i; ) {
                            if (this.hashed && (this.hashed = !1,
                            a[0] = this.block,
                            a[16] = a[1] = a[2] = a[3] = a[4] = a[5] = a[6] = a[7] = a[8] = a[9] = a[10] = a[11] = a[12] = a[13] = a[14] = a[15] = 0),
                            t)
                                for (r = this.start; o < i && r < 64; ++o)
                                    a[r >> 2] |= e[o] << SHIFT[3 & r++];
                            else
                                for (r = this.start; o < i && r < 64; ++o)
                                    (n = e.charCodeAt(o)) < 128 ? a[r >> 2] |= n << SHIFT[3 & r++] : n < 2048 ? (a[r >> 2] |= (192 | n >> 6) << SHIFT[3 & r++],
                                    a[r >> 2] |= (128 | 63 & n) << SHIFT[3 & r++]) : n < 55296 || n >= 57344 ? (a[r >> 2] |= (224 | n >> 12) << SHIFT[3 & r++],
                                    a[r >> 2] |= (128 | n >> 6 & 63) << SHIFT[3 & r++],
                                    a[r >> 2] |= (128 | 63 & n) << SHIFT[3 & r++]) : (n = 65536 + ((1023 & n) << 10 | 1023 & e.charCodeAt(++o)),
                                    a[r >> 2] |= (240 | n >> 18) << SHIFT[3 & r++],
                                    a[r >> 2] |= (128 | n >> 12 & 63) << SHIFT[3 & r++],
                                    a[r >> 2] |= (128 | n >> 6 & 63) << SHIFT[3 & r++],
                                    a[r >> 2] |= (128 | 63 & n) << SHIFT[3 & r++]);
                            this.lastByteIndex = r,
                            this.bytes += r - this.start,
                            r >= 64 ? (this.block = a[16],
                            this.start = r - 64,
                            this.hash(),
                            this.hashed = !0) : this.start = r;
                        }
                        return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0,
                        this.bytes = this.bytes % 4294967296),
                        this;
                    }
                }
                ,
                Sha1.prototype.finalize = function() {
                    if (!this.finalized) {
                        this.finalized = !0;
                        var e = this.blocks
                            , t = this.lastByteIndex;
                        e[16] = this.block,
                        e[t >> 2] |= EXTRA[3 & t],
                        this.block = e[16],
                        t >= 56 && (this.hashed || this.hash(),
                        e[0] = this.block,
                        e[16] = e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = 0),
                        e[14] = this.hBytes << 3 | this.bytes >>> 29,
                        e[15] = this.bytes << 3,
                        this.hash();
                    }
                }
                ,
                Sha1.prototype.hash = function() {
                    var e, t, n = this.h0, r = this.h1, o = this.h2, i = this.h3, a = this.h4, s = this.blocks;
                    for (e = 16; e < 80; ++e)
                        t = s[e - 3] ^ s[e - 8] ^ s[e - 14] ^ s[e - 16],
                        s[e] = t << 1 | t >>> 31;
                    for (e = 0; e < 20; e += 5)
                        n = (t = (r = (t = (o = (t = (i = (t = (a = (t = n << 5 | n >>> 27) + (r & o | ~r & i) + a + 1518500249 + s[e] << 0) << 5 | a >>> 27) + (n & (r = r << 30 | r >>> 2) | ~n & o) + i + 1518500249 + s[e + 1] << 0) << 5 | i >>> 27) + (a & (n = n << 30 | n >>> 2) | ~a & r) + o + 1518500249 + s[e + 2] << 0) << 5 | o >>> 27) + (i & (a = a << 30 | a >>> 2) | ~i & n) + r + 1518500249 + s[e + 3] << 0) << 5 | r >>> 27) + (o & (i = i << 30 | i >>> 2) | ~o & a) + n + 1518500249 + s[e + 4] << 0,
                        o = o << 30 | o >>> 2;
                    for (; e < 40; e += 5)
                        n = (t = (r = (t = (o = (t = (i = (t = (a = (t = n << 5 | n >>> 27) + (r ^ o ^ i) + a + 1859775393 + s[e] << 0) << 5 | a >>> 27) + (n ^ (r = r << 30 | r >>> 2) ^ o) + i + 1859775393 + s[e + 1] << 0) << 5 | i >>> 27) + (a ^ (n = n << 30 | n >>> 2) ^ r) + o + 1859775393 + s[e + 2] << 0) << 5 | o >>> 27) + (i ^ (a = a << 30 | a >>> 2) ^ n) + r + 1859775393 + s[e + 3] << 0) << 5 | r >>> 27) + (o ^ (i = i << 30 | i >>> 2) ^ a) + n + 1859775393 + s[e + 4] << 0,
                        o = o << 30 | o >>> 2;
                    for (; e < 60; e += 5)
                        n = (t = (r = (t = (o = (t = (i = (t = (a = (t = n << 5 | n >>> 27) + (r & o | r & i | o & i) + a - 1894007588 + s[e] << 0) << 5 | a >>> 27) + (n & (r = r << 30 | r >>> 2) | n & o | r & o) + i - 1894007588 + s[e + 1] << 0) << 5 | i >>> 27) + (a & (n = n << 30 | n >>> 2) | a & r | n & r) + o - 1894007588 + s[e + 2] << 0) << 5 | o >>> 27) + (i & (a = a << 30 | a >>> 2) | i & n | a & n) + r - 1894007588 + s[e + 3] << 0) << 5 | r >>> 27) + (o & (i = i << 30 | i >>> 2) | o & a | i & a) + n - 1894007588 + s[e + 4] << 0,
                        o = o << 30 | o >>> 2;
                    for (; e < 80; e += 5)
                        n = (t = (r = (t = (o = (t = (i = (t = (a = (t = n << 5 | n >>> 27) + (r ^ o ^ i) + a - 899497514 + s[e] << 0) << 5 | a >>> 27) + (n ^ (r = r << 30 | r >>> 2) ^ o) + i - 899497514 + s[e + 1] << 0) << 5 | i >>> 27) + (a ^ (n = n << 30 | n >>> 2) ^ r) + o - 899497514 + s[e + 2] << 0) << 5 | o >>> 27) + (i ^ (a = a << 30 | a >>> 2) ^ n) + r - 899497514 + s[e + 3] << 0) << 5 | r >>> 27) + (o ^ (i = i << 30 | i >>> 2) ^ a) + n - 899497514 + s[e + 4] << 0,
                        o = o << 30 | o >>> 2;
                    this.h0 = this.h0 + n << 0,
                    this.h1 = this.h1 + r << 0,
                    this.h2 = this.h2 + o << 0,
                    this.h3 = this.h3 + i << 0,
                    this.h4 = this.h4 + a << 0;
                }
                ,
                Sha1.prototype.hex = function() {
                    this.finalize();
                    var e = this.h0
                        , t = this.h1
                        , n = this.h2
                        , r = this.h3
                        , o = this.h4;
                    return HEX_CHARS[e >> 28 & 15] + HEX_CHARS[e >> 24 & 15] + HEX_CHARS[e >> 20 & 15] + HEX_CHARS[e >> 16 & 15] + HEX_CHARS[e >> 12 & 15] + HEX_CHARS[e >> 8 & 15] + HEX_CHARS[e >> 4 & 15] + HEX_CHARS[15 & e] + HEX_CHARS[t >> 28 & 15] + HEX_CHARS[t >> 24 & 15] + HEX_CHARS[t >> 20 & 15] + HEX_CHARS[t >> 16 & 15] + HEX_CHARS[t >> 12 & 15] + HEX_CHARS[t >> 8 & 15] + HEX_CHARS[t >> 4 & 15] + HEX_CHARS[15 & t] + HEX_CHARS[n >> 28 & 15] + HEX_CHARS[n >> 24 & 15] + HEX_CHARS[n >> 20 & 15] + HEX_CHARS[n >> 16 & 15] + HEX_CHARS[n >> 12 & 15] + HEX_CHARS[n >> 8 & 15] + HEX_CHARS[n >> 4 & 15] + HEX_CHARS[15 & n] + HEX_CHARS[r >> 28 & 15] + HEX_CHARS[r >> 24 & 15] + HEX_CHARS[r >> 20 & 15] + HEX_CHARS[r >> 16 & 15] + HEX_CHARS[r >> 12 & 15] + HEX_CHARS[r >> 8 & 15] + HEX_CHARS[r >> 4 & 15] + HEX_CHARS[15 & r] + HEX_CHARS[o >> 28 & 15] + HEX_CHARS[o >> 24 & 15] + HEX_CHARS[o >> 20 & 15] + HEX_CHARS[o >> 16 & 15] + HEX_CHARS[o >> 12 & 15] + HEX_CHARS[o >> 8 & 15] + HEX_CHARS[o >> 4 & 15] + HEX_CHARS[15 & o];
                }
                ,
                Sha1.prototype.toString = Sha1.prototype.hex,
                Sha1.prototype.digest = function() {
                    this.finalize();
                    var e = this.h0
                        , t = this.h1
                        , n = this.h2
                        , r = this.h3
                        , o = this.h4;
                    return [e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e, t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, 255 & t, n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, 255 & n, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, 255 & r, o >> 24 & 255, o >> 16 & 255, o >> 8 & 255, 255 & o];
                }
                ,
                Sha1.prototype.array = Sha1.prototype.digest,
                Sha1.prototype.arrayBuffer = function() {
                    this.finalize();
                    var e = new ArrayBuffer(20)
                        , t = new DataView(e);
                    return t.setUint32(0, this.h0),
                    t.setUint32(4, this.h1),
                    t.setUint32(8, this.h2),
                    t.setUint32(12, this.h3),
                    t.setUint32(16, this.h4),
                    e;
                }
                ;
                var exports = createMethod();
                COMMON_JS ? module.exports = exports : (root.sha1 = exports,
                AMD && (__WEBPACK_AMD_DEFINE_RESULT__ = function() {
                    return exports;
                }
                    .call(exports, __webpack_require__, exports, module),
                void 0 === __WEBPACK_AMD_DEFINE_RESULT__ || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)));
            }();
        }
        ).call(this, __webpack_require__(3), __webpack_require__(4));
    }
    , function(e, t) {
        var n, r, o = e.exports = {};
        function i() {
            throw new Error('setTimeout has not been defined');
        }
        function a() {
            throw new Error('clearTimeout has not been defined');
        }
        function s(e) {
            if (n === setTimeout)
                return setTimeout(e, 0);
            if ((n === i || !n) && setTimeout)
                return n = setTimeout,
                setTimeout(e, 0);
            try {
                return n(e, 0);
            } catch (t) {
                try {
                    return n.call(null, e, 0);
                } catch (t) {
                    return n.call(this, e, 0);
                }
            }
        }
        !function() {
            try {
                n = 'function' == typeof setTimeout ? setTimeout : i;
            } catch (e) {
                n = i;
            }
            try {
                r = 'function' == typeof clearTimeout ? clearTimeout : a;
            } catch (e) {
                r = a;
            }
        }();
        var c, u = [], l = !1, d = -1;
        function p() {
            l && c && (l = !1,
            c.length ? u = c.concat(u) : d = -1,
            u.length && f());
        }
        function f() {
            if (!l) {
                var e = s(p);
                l = !0;
                for (var t = u.length; t; ) {
                    for (c = u,
                    u = []; ++d < t; )
                        c && c[d].run();
                    d = -1,
                    t = u.length;
                }
                c = null,
                l = !1,
                function(e) {
                    if (r === clearTimeout)
                        return clearTimeout(e);
                    if ((r === a || !r) && clearTimeout)
                        return r = clearTimeout,
                        clearTimeout(e);
                    try {
                        r(e);
                    } catch (t) {
                        try {
                            return r.call(null, e);
                        } catch (t) {
                            return r.call(this, e);
                        }
                    }
                }(e);
            }
        }
        function h(e, t) {
            this.fun = e,
            this.array = t;
        }
        function m() {}
        o.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++)
                    t[n - 1] = arguments[n];
            u.push(new h(e,t)),
            1 !== u.length || l || s(f);
        }
        ,
        h.prototype.run = function() {
            this.fun.apply(null, this.array);
        }
        ,
        o.title = 'browser',
        o.browser = !0,
        o.env = {},
        o.argv = [],
        o.version = '',
        o.versions = {},
        o.on = m,
        o.addListener = m,
        o.once = m,
        o.off = m,
        o.removeListener = m,
        o.removeAllListeners = m,
        o.emit = m,
        o.prependListener = m,
        o.prependOnceListener = m,
        o.listeners = function(e) {
            return [];
        }
        ,
        o.binding = function(e) {
            throw new Error('process.binding is not supported');
        }
        ,
        o.cwd = function() {
            return '/';
        }
        ,
        o.chdir = function(e) {
            throw new Error('process.chdir is not supported');
        }
        ,
        o.umask = function() {
            return 0;
        };
    }
    , function(e, t) {
        var n;
        n = function() {
            return this;
        }();
        try {
            n = n || new Function('return this')();
        } catch (e) {
            'object' == typeof window && (n = window);
        }
        e.exports = n;
    }
    , function(e, t) {
        (function(t) {
            e.exports = t;
        }
        ).call(this, {});
    }
    , function(e, t, n) {
        var r = n(7);
        e.exports = r;
    }
    , function(e, t, n) {
        'use strict';
        var r = n(8)
            , o = n(16)
            , i = n(17)
            , a = n(19)
            , s = n(21)
            , c = {
                AppId: '',
                SecretId: '',
                SecretKey: '',
                XCosSecurityToken: '',
                ChunkRetryTimes: 2,
                FileParallelLimit: 3,
                ChunkParallelLimit: 3,
                ChunkSize: 1048576,
                SliceSize: 1048576,
                CopyChunkParallelLimit: 20,
                CopyChunkSize: 10485760,
                CopySliceSize: 10485760,
                MaxPartNumber: 1e4,
                ProgressInterval: 1e3,
                UploadQueueSize: 1e4,
                Domain: '',
                ServiceDomain: '',
                Protocol: '',
                CompatibilityMode: !1,
                ForcePathStyle: !1,
                UseRawKey: !1,
                Timeout: 0,
                CorrectClockSkew: !0,
                SystemClockOffset: 0,
                UploadCheckContentMd5: !1,
                UploadAddMetaMd5: !1,
                UploadIdCacheLimit: 50
            }
            , u = function(e) {
                this.options = r.extend(r.clone(c), e || {}),
                this.options.FileParallelLimit = Math.max(1, this.options.FileParallelLimit),
                this.options.ChunkParallelLimit = Math.max(1, this.options.ChunkParallelLimit),
                this.options.ChunkRetryTimes = Math.max(0, this.options.ChunkRetryTimes),
                this.options.ChunkSize = Math.max(1048576, this.options.ChunkSize),
                this.options.CopyChunkParallelLimit = Math.max(1, this.options.CopyChunkParallelLimit),
                this.options.CopyChunkSize = Math.max(1048576, this.options.CopyChunkSize),
                this.options.CopySliceSize = Math.max(0, this.options.CopySliceSize),
                this.options.MaxPartNumber = Math.max(1024, Math.min(1e4, this.options.MaxPartNumber)),
                this.options.Timeout = Math.max(0, this.options.Timeout),
                this.options.AppId && console.warn('warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g: "test-1250000000").'),
                o.init(this),
                i.init(this);
            };
        a.init(u, i),
        s.init(u, i),
        u.getAuthorization = r.getAuth,
        u.version = '0.5.26',
        e.exports = u;
    }
    , function(e, t, n) {
        'use strict';
        var r = n(9)
            , o = n(10)
            , i = n(11)
            , a = n(15);
        function s(e) {
            return encodeURIComponent(e).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
        }
        var c, u, l, d, p, f = function() {}, h = function(e) {
                var t = {};
                for (var n in e)
                    e.hasOwnProperty(n) && void 0 !== e[n] && null !== e[n] && (t[n] = e[n]);
                return t;
            }, m = (p = function(e, t) {
                e = e.split('.'),
                t = t.split('.');
                for (var n = 0; n < t.length; n++)
                    if (e[n] !== t[n])
                        return parseInt(e[n]) > parseInt(t[n]) ? 1 : -1;
                return 0;
            }
            ,
            c = navigator && navigator.userAgent,
            u = (c.match(/Chrome\/([.\d]+)/) || [])[1],
            l = (c.match(/QBCore\/([.\d]+)/) || [])[1],
            d = (c.match(/QQBrowser\/([.\d]+)/) || [])[1],
            u && p(u, '53.0.2785.116') < 0 && l && p(l, '3.53.991.400') < 0 && d && p(d, '9.0.2524.400') <= 0 || !1);
        function g(e) {
            return b(e, (function(e) {
                return 'object' == typeof e ? g(e) : e;
            }
            ));
        }
        function y(e, t) {
            return C(t, (function(n, r) {
                e[r] = t[r];
            }
            )),
            e;
        }
        function v(e) {
            return e instanceof Array;
        }
        function C(e, t) {
            for (var n in e)
                e.hasOwnProperty(n) && t(e[n], n);
        }
        function b(e, t) {
            var n = v(e) ? [] : {};
            for (var r in e)
                e.hasOwnProperty(r) && (n[r] = t(e[r], r));
            return n;
        }
        var S = function(e, t) {
                if (t = y({}, t),
                'getAuth' !== e && 'getV4Auth' !== e && 'getObjectUrl' !== e) {
                    var n = t.Headers || {};
                    if (t && 'object' == typeof t) {
                        !function() {
                            for (var e in t)
                                t.hasOwnProperty(e) && e.indexOf('x-cos-') > -1 && (n[e] = t[e]);
                        }();
                        w.each({
                            'x-cos-mfa': 'MFA',
                            'Content-MD5': 'ContentMD5',
                            'Content-Length': 'ContentLength',
                            'Content-Type': 'ContentType',
                            Expect: 'Expect',
                            Expires: 'Expires',
                            'Cache-Control': 'CacheControl',
                            'Content-Disposition': 'ContentDisposition',
                            'Content-Encoding': 'ContentEncoding',
                            Range: 'Range',
                            'If-Modified-Since': 'IfModifiedSince',
                            'If-Unmodified-Since': 'IfUnmodifiedSince',
                            'If-Match': 'IfMatch',
                            'If-None-Match': 'IfNoneMatch',
                            'x-cos-copy-source': 'CopySource',
                            'x-cos-copy-source-Range': 'CopySourceRange',
                            'x-cos-metadata-directive': 'MetadataDirective',
                            'x-cos-copy-source-If-Modified-Since': 'CopySourceIfModifiedSince',
                            'x-cos-copy-source-If-Unmodified-Since': 'CopySourceIfUnmodifiedSince',
                            'x-cos-copy-source-If-Match': 'CopySourceIfMatch',
                            'x-cos-copy-source-If-None-Match': 'CopySourceIfNoneMatch',
                            'x-cos-acl': 'ACL',
                            'x-cos-grant-read': 'GrantRead',
                            'x-cos-grant-write': 'GrantWrite',
                            'x-cos-grant-full-control': 'GrantFullControl',
                            'x-cos-grant-read-acp': 'GrantReadAcp',
                            'x-cos-grant-write-acp': 'GrantWriteAcp',
                            'x-cos-storage-class': 'StorageClass',
                            'x-cos-server-side-encryption-customer-algorithm': 'SSECustomerAlgorithm',
                            'x-cos-server-side-encryption-customer-key': 'SSECustomerKey',
                            'x-cos-server-side-encryption-customer-key-MD5': 'SSECustomerKeyMD5',
                            'x-cos-server-side-encryption': 'ServerSideEncryption',
                            'x-cos-server-side-encryption-cos-kms-key-id': 'SSEKMSKeyId',
                            'x-cos-server-side-encryption-context': 'SSEContext'
                        }, (function(e, r) {
                            void 0 !== t[e] && (n[r] = t[e]);
                        }
                        )),
                        t.Headers = h(n);
                    }
                }
                return t;
            }
            , x = function(e) {
                return Date.now() + (e || 0);
            }
            , w = {
                noop: f,
                formatParams: S,
                apiWrapper: function(e, t) {
                    return function(n, r) {
                        'function' == typeof n && (r = n,
                        n = {}),
                        n = S(e, n);
                        var o = function(e) {
                                return e && e.headers && (e.headers['x-cos-version-id'] && (e.VersionId = e.headers['x-cos-version-id']),
                                e.headers['x-cos-delete-marker'] && (e.DeleteMarker = e.headers['x-cos-delete-marker'])),
                                e;
                            }
                            , i = function(e, t) {
                                r && r(o(e), o(t));
                            };
                        if ('getService' !== e && 'abortUploadTask' !== e) {
                            var a;
                            if (a = function(e, t) {
                                var n = t.Bucket
                                    , r = t.Region
                                    , o = t.Key;
                                if (e.indexOf('Bucket') > -1 || 'deleteMultipleObject' === e || 'multipartList' === e || 'listObjectVersions' === e) {
                                    if (!n)
                                        return 'Bucket';
                                    if (!r)
                                        return 'Region';
                                } else if (e.indexOf('Object') > -1 || e.indexOf('multipart') > -1 || 'sliceUploadFile' === e || 'abortUploadTask' === e) {
                                    if (!n)
                                        return 'Bucket';
                                    if (!r)
                                        return 'Region';
                                    if (!o)
                                        return 'Key';
                                }
                                return !1;
                            }(e, n))
                                return void i({
                                    error: 'missing param ' + a
                                });
                            if (n.Region) {
                                if (n.Region.indexOf('cos.') > -1)
                                    return void i({
                                        error: 'param Region should not be start with "cos."'
                                    });
                                if (!/^([a-z\d-]+)$/.test(n.Region))
                                    return void i({
                                        error: 'Region format error.'
                                    });
                                this.options.CompatibilityMode || -1 !== n.Region.indexOf('-') || 'yfb' === n.Region || 'default' === n.Region || console.warn('warning: param Region format error, find help here: https://cloud.tencent.com/document/product/436/6224');
                            }
                            if (n.Bucket) {
                                if (!/^([a-z\d-]+)-(\d+)$/.test(n.Bucket))
                                    if (n.AppId)
                                        n.Bucket = n.Bucket + '-' + n.AppId;
                                    else {
                                        if (!this.options.AppId)
                                            return void i({
                                                error: 'Bucket should format as "test-1250000000".'
                                            });
                                        n.Bucket = n.Bucket + '-' + this.options.AppId;
                                    }
                                n.AppId && (console.warn('warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g Bucket:"test-1250000000" ).'),
                                delete n.AppId);
                            }
                            !this.options.UseRawKey && n.Key && '/' === n.Key.substr(0, 1) && (n.Key = n.Key.substr(1));
                        }
                        var s = t.call(this, n, i);
                        if ('getAuth' === e || 'getObjectUrl' === e)
                            return s;
                    };
                },
                xml2json: i,
                json2xml: a,
                md5: r,
                clearKey: h,
                fileSlice: function(e, t, n, r, o) {
                    var i;
                    if (e.slice ? i = e.slice(t, n) : e.mozSlice ? i = e.mozSlice(t, n) : e.webkitSlice && (i = e.webkitSlice(t, n)),
                    r && m) {
                        var a = new FileReader;
                        a.onload = function(e) {
                            i = null,
                            o(new Blob([a.result]));
                        }
                        ,
                        a.readAsArrayBuffer(i);
                    } else
                        o(i);
                },
                getBodyMd5: function(e, t, n, r) {
                    n = n || f,
                    e ? 'string' == typeof t ? n(w.md5(t, !0)) : Blob && t instanceof Blob ? w.getFileMd5(t, (function(e, t) {
                        n(t);
                    }
                    ), r) : n() : n();
                },
                getFileMd5: function(e, t, n) {
                    var o = e.size
                        , i = 0
                        , a = r.getCtx()
                        , s = function(r) {
                            if (r >= o) {
                                var c = a.digest('hex');
                                t(null, c);
                            } else {
                                var u = Math.min(o, r + 1048576);
                                w.fileSlice(e, r, u, !1, (function(e) {
                                    !function(e, t) {
                                        var n, r = new FileReader;
                                        FileReader.prototype.readAsBinaryString ? (n = FileReader.prototype.readAsBinaryString,
                                        r.onload = function() {
                                            t(this.result);
                                        }
                                        ) : FileReader.prototype.readAsArrayBuffer ? n = function(e) {
                                            var n = ''
                                                , r = new FileReader;
                                            r.onload = function(e) {
                                                for (var o = new Uint8Array(r.result), i = o.byteLength, a = 0; a < i; a++)
                                                    n += String.fromCharCode(o[a]);
                                                t(n);
                                            }
                                            ,
                                            r.readAsArrayBuffer(e);
                                        }
                                            : console.error('FileReader not support readAsBinaryString'),
                                        n.call(r, e);
                                    }(e, (function(t) {
                                        e = null,
                                        a = a.update(t, !0),
                                        i += t.length,
                                        t = null,
                                        n && n({
                                            loaded: i,
                                            total: o,
                                            percent: Math.round(i / o * 1e4) / 1e4
                                        }),
                                        s(r + 1048576);
                                    }
                                    ));
                                }
                                ));
                            }
                        };
                    s(0);
                },
                binaryBase64: function(e) {
                    var t, n, r, o = '';
                    for (t = 0,
                    n = e.length / 2; t < n; t++)
                        r = parseInt(e[2 * t] + e[2 * t + 1], 16),
                        o += String.fromCharCode(r);
                    return btoa(o);
                },
                extend: y,
                isArray: v,
                isInArray: function(e, t) {
                    for (var n = !1, r = 0; r < e.length; r++)
                        if (t === e[r]) {
                            n = !0;
                            break;
                        }
                    return n;
                },
                makeArray: function(e) {
                    return v(e) ? e : [e];
                },
                each: C,
                map: b,
                filter: function(e, t) {
                    var n = v(e)
                        , r = n ? [] : {};
                    for (var o in e)
                        e.hasOwnProperty(o) && t(e[o], o) && (n ? r.push(e[o]) : r[o] = e[o]);
                    return r;
                },
                clone: g,
                uuid: function() {
                    var e = function() {
                        return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
                    };
                    return e() + e() + '-' + e() + '-' + e() + '-' + e() + '-' + e() + e() + e();
                },
                camSafeUrlEncode: s,
                throttleOnProgress: function(e, t) {
                    var n, r, o = this, i = 0, a = 0, s = Date.now();
                    function c() {
                        if (r = 0,
                        t && 'function' == typeof t) {
                            n = Date.now();
                            var o, c = Math.max(0, Math.round((a - i) / ((n - s) / 1e3) * 100) / 100);
                            o = 0 === a && 0 === e ? 1 : Math.round(a / e * 100) / 100 || 0,
                            s = n,
                            i = a;
                            try {
                                t({
                                    loaded: a,
                                    total: e,
                                    speed: c,
                                    percent: o
                                });
                            } catch (e) {}
                        }
                    }
                    return function(t, n) {
                        if (t && (a = t.loaded,
                        e = t.total),
                        n)
                            clearTimeout(r),
                            c();
                        else {
                            if (r)
                                return;
                            r = setTimeout(c, o.options.ProgressInterval);
                        }
                    };
                },
                getFileSize: function(e, t, n) {
                    var r;
                    'string' == typeof t.Body && (t.Body = new Blob([t.Body],{
                        type: 'text/plain'
                    })),
                    t.Body && (t.Body instanceof Blob || '[object File]' === t.Body.toString() || '[object Blob]' === t.Body.toString()) ? (r = t.Body.size,
                    t.ContentLength = r,
                    n(null, r)) : n({
                        error: 'params body format error, Only allow File|Blob|String.'
                    });
                },
                getSkewTime: x,
                getAuth: function(e) {
                    var t, n = (e = e || {}).SecretId, r = e.SecretKey, i = e.KeyTime, a = (e.method || e.Method || 'get').toLowerCase(), c = g(e.Query || e.params || {}), u = g(e.Headers || e.headers || {}), l = e.Key || '';
                    if (e.UseRawKey ? t = e.Pathname || e.pathname || '/' + l : 0 !== (t = e.Pathname || e.pathname || l).indexOf('/') && (t = '/' + t),
                    !n)
                        return console.error('missing param SecretId');
                    if (!r)
                        return console.error('missing param SecretKey');
                    var d = function(e) {
                            var t = [];
                            for (var n in e)
                                e.hasOwnProperty(n) && t.push(n);
                            return t.sort((function(e, t) {
                                return (e = e.toLowerCase()) === (t = t.toLowerCase()) ? 0 : e > t ? 1 : -1;
                            }
                            ));
                        }
                        , p = function(e) {
                            var t, n, r, o = [], i = d(e);
                            for (t = 0; t < i.length; t++)
                                r = void 0 === e[n = i[t]] || null === e[n] ? '' : '' + e[n],
                                n = s(n = n.toLowerCase()),
                                r = s(r) || '',
                                o.push(n + '=' + r);
                            return o.join('&');
                        }
                        , f = Math.round(x(e.SystemClockOffset) / 1e3) - 1
                        , h = f
                        , m = e.Expires || e.expires;
                    h += void 0 === m ? 900 : 1 * m || 0;
                    var y = n
                        , v = i || f + ';' + h
                        , C = i || f + ';' + h
                        , b = d(u).join(';').toLowerCase()
                        , S = d(c).join(';').toLowerCase()
                        , w = o.HmacSHA1(C, r).toString()
                        , k = [a, t, p(c), p(u), ''].join('\n')
                        , T = ['sha1', v, o.SHA1(k).toString(), ''].join('\n');
                    return ['q-sign-algorithm=sha1', 'q-ak=' + y, 'q-sign-time=' + v, 'q-key-time=' + C, 'q-header-list=' + b, 'q-url-param-list=' + S, 'q-signature=' + o.HmacSHA1(T, w).toString()].join('&');
                },
                isBrowser: !0
            };
        e.exports = w;
    }
    , function(e, t) {
        function n(e, t) {
            var n = e[0]
                , r = e[1]
                , c = e[2]
                , u = e[3];
            n = o(n, r, c, u, t[0], 7, -680876936),
            u = o(u, n, r, c, t[1], 12, -389564586),
            c = o(c, u, n, r, t[2], 17, 606105819),
            r = o(r, c, u, n, t[3], 22, -1044525330),
            n = o(n, r, c, u, t[4], 7, -176418897),
            u = o(u, n, r, c, t[5], 12, 1200080426),
            c = o(c, u, n, r, t[6], 17, -1473231341),
            r = o(r, c, u, n, t[7], 22, -45705983),
            n = o(n, r, c, u, t[8], 7, 1770035416),
            u = o(u, n, r, c, t[9], 12, -1958414417),
            c = o(c, u, n, r, t[10], 17, -42063),
            r = o(r, c, u, n, t[11], 22, -1990404162),
            n = o(n, r, c, u, t[12], 7, 1804603682),
            u = o(u, n, r, c, t[13], 12, -40341101),
            c = o(c, u, n, r, t[14], 17, -1502002290),
            n = i(n, r = o(r, c, u, n, t[15], 22, 1236535329), c, u, t[1], 5, -165796510),
            u = i(u, n, r, c, t[6], 9, -1069501632),
            c = i(c, u, n, r, t[11], 14, 643717713),
            r = i(r, c, u, n, t[0], 20, -373897302),
            n = i(n, r, c, u, t[5], 5, -701558691),
            u = i(u, n, r, c, t[10], 9, 38016083),
            c = i(c, u, n, r, t[15], 14, -660478335),
            r = i(r, c, u, n, t[4], 20, -405537848),
            n = i(n, r, c, u, t[9], 5, 568446438),
            u = i(u, n, r, c, t[14], 9, -1019803690),
            c = i(c, u, n, r, t[3], 14, -187363961),
            r = i(r, c, u, n, t[8], 20, 1163531501),
            n = i(n, r, c, u, t[13], 5, -1444681467),
            u = i(u, n, r, c, t[2], 9, -51403784),
            c = i(c, u, n, r, t[7], 14, 1735328473),
            n = a(n, r = i(r, c, u, n, t[12], 20, -1926607734), c, u, t[5], 4, -378558),
            u = a(u, n, r, c, t[8], 11, -2022574463),
            c = a(c, u, n, r, t[11], 16, 1839030562),
            r = a(r, c, u, n, t[14], 23, -35309556),
            n = a(n, r, c, u, t[1], 4, -1530992060),
            u = a(u, n, r, c, t[4], 11, 1272893353),
            c = a(c, u, n, r, t[7], 16, -155497632),
            r = a(r, c, u, n, t[10], 23, -1094730640),
            n = a(n, r, c, u, t[13], 4, 681279174),
            u = a(u, n, r, c, t[0], 11, -358537222),
            c = a(c, u, n, r, t[3], 16, -722521979),
            r = a(r, c, u, n, t[6], 23, 76029189),
            n = a(n, r, c, u, t[9], 4, -640364487),
            u = a(u, n, r, c, t[12], 11, -421815835),
            c = a(c, u, n, r, t[15], 16, 530742520),
            n = s(n, r = a(r, c, u, n, t[2], 23, -995338651), c, u, t[0], 6, -198630844),
            u = s(u, n, r, c, t[7], 10, 1126891415),
            c = s(c, u, n, r, t[14], 15, -1416354905),
            r = s(r, c, u, n, t[5], 21, -57434055),
            n = s(n, r, c, u, t[12], 6, 1700485571),
            u = s(u, n, r, c, t[3], 10, -1894986606),
            c = s(c, u, n, r, t[10], 15, -1051523),
            r = s(r, c, u, n, t[1], 21, -2054922799),
            n = s(n, r, c, u, t[8], 6, 1873313359),
            u = s(u, n, r, c, t[15], 10, -30611744),
            c = s(c, u, n, r, t[6], 15, -1560198380),
            r = s(r, c, u, n, t[13], 21, 1309151649),
            n = s(n, r, c, u, t[4], 6, -145523070),
            u = s(u, n, r, c, t[11], 10, -1120210379),
            c = s(c, u, n, r, t[2], 15, 718787259),
            r = s(r, c, u, n, t[9], 21, -343485551),
            e[0] = h(n, e[0]),
            e[1] = h(r, e[1]),
            e[2] = h(c, e[2]),
            e[3] = h(u, e[3]);
        }
        function r(e, t, n, r, o, i) {
            return t = h(h(t, e), h(r, i)),
            h(t << o | t >>> 32 - o, n);
        }
        function o(e, t, n, o, i, a, s) {
            return r(t & n | ~t & o, e, t, i, a, s);
        }
        function i(e, t, n, o, i, a, s) {
            return r(t & o | n & ~o, e, t, i, a, s);
        }
        function a(e, t, n, o, i, a, s) {
            return r(t ^ n ^ o, e, t, i, a, s);
        }
        function s(e, t, n, o, i, a, s) {
            return r(n ^ (t | ~o), e, t, i, a, s);
        }
        function c(e) {
            var t, n = [];
            for (t = 0; t < 64; t += 4)
                n[t >> 2] = e.charCodeAt(t) + (e.charCodeAt(t + 1) << 8) + (e.charCodeAt(t + 2) << 16) + (e.charCodeAt(t + 3) << 24);
            return n;
        }
        var u = '0123456789abcdef'.split('');
        function l(e) {
            for (var t = '', n = 0; n < 4; n++)
                t += u[e >> 8 * n + 4 & 15] + u[e >> 8 * n & 15];
            return t;
        }
        function d(e) {
            for (var t = 0; t < e.length; t++)
                e[t] = l(e[t]);
            return e.join('');
        }
        function p(e) {
            e = e.replace(/\r\n/g, '\n');
            for (var t = '', n = 0; n < e.length; n++) {
                var r = e.charCodeAt(n);
                r < 128 ? t += String.fromCharCode(r) : r > 127 && r < 2048 ? (t += String.fromCharCode(r >> 6 | 192),
                t += String.fromCharCode(63 & r | 128)) : (t += String.fromCharCode(r >> 12 | 224),
                t += String.fromCharCode(r >> 6 & 63 | 128),
                t += String.fromCharCode(63 & r | 128));
            }
            return t;
        }
        function f(e, t) {
            return t || (e = p(e)),
            d(function(e) {
                var t, r = e.length, o = [1732584193, -271733879, -1732584194, 271733878];
                for (t = 64; t <= e.length; t += 64)
                    n(o, c(e.substring(t - 64, t)));
                e = e.substring(t - 64);
                var i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (t = 0; t < e.length; t++)
                    i[t >> 2] |= e.charCodeAt(t) << (t % 4 << 3);
                if (i[t >> 2] |= 128 << (t % 4 << 3),
                t > 55)
                    for (n(o, i),
                    t = 0; t < 16; t++)
                        i[t] = 0;
                return i[14] = 8 * r,
                n(o, i),
                o;
            }(e));
        }
        var h = function(e, t) {
            return e + t & 4294967295;
        };
        '5d41402abc4b2a76b9719d911017c592' != f('hello') && (h = function(e, t) {
            var n = (65535 & e) + (65535 & t);
            return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n;
        }
        ),
        f.getCtx = function() {
            var e = {
                state: [1732584193, -271733879, -1732584194, 271733878],
                tail: '',
                size: 0,
                update: function(t, r) {
                    r || (t = p(t)),
                    e.size += t.length,
                    t = e.tail + t;
                    var o, i = e.state;
                    for (o = 64; o <= t.length; o += 64)
                        n(i, c(t.substring(o - 64, o)));
                    return e.tail = t.substring(o - 64),
                    e;
                }
            };
            return e.digest = function(t) {
                var r, o = e.size, i = e.state, a = e.tail, s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (r = 0; r < a.length; r++)
                    s[r >> 2] |= a.charCodeAt(r) << (r % 4 << 3);
                if (s[r >> 2] |= 128 << (r % 4 << 3),
                r > 55)
                    for (n(i, s),
                    r = 0; r < 16; r++)
                        s[r] = 0;
                return s[14] = 8 * o,
                n(i, s),
                'hex' === t ? d(i) : 'base64' === t ? function(e) {
                    var t, n, r, o = '';
                    for (t = 0,
                    n = e.length / 2; t < n; t++)
                        r = parseInt(e[2 * t] + e[2 * t + 1], 16),
                        o += String.fromCharCode(r);
                    return btoa(o);
                }(d(i)) : i;
            }
            ,
            e;
        }
        ,
        e.exports = f;
    }
    , function(e, t, n) {
        var r, o, i, a, s, c, u, l = l || function(e, t) {
            var n = {}
                , r = n.lib = {}
                , o = function() {}
                , i = r.Base = {
                    extend: function(e) {
                        o.prototype = this;
                        var t = new o;
                        return e && t.mixIn(e),
                        t.hasOwnProperty('init') || (t.init = function() {
                            t.$super.init.apply(this, arguments);
                        }
                        ),
                        t.init.prototype = t,
                        t.$super = this,
                        t;
                    },
                    create: function() {
                        var e = this.extend();
                        return e.init.apply(e, arguments),
                        e;
                    },
                    init: function() {},
                    mixIn: function(e) {
                        for (var t in e)
                            e.hasOwnProperty(t) && (this[t] = e[t]);
                        e.hasOwnProperty('toString') && (this.toString = e.toString);
                    },
                    clone: function() {
                        return this.init.prototype.extend(this);
                    }
                }
                , a = r.WordArray = i.extend({
                    init: function(e, t) {
                        e = this.words = e || [],
                        this.sigBytes = null != t ? t : 4 * e.length;
                    },
                    toString: function(e) {
                        return (e || c).stringify(this);
                    },
                    concat: function(e) {
                        var t = this.words
                            , n = e.words
                            , r = this.sigBytes;
                        if (e = e.sigBytes,
                        this.clamp(),
                        r % 4)
                            for (var o = 0; o < e; o++)
                                t[r + o >>> 2] |= (n[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 24 - (r + o) % 4 * 8;
                        else if (65535 < n.length)
                            for (o = 0; o < e; o += 4)
                                t[r + o >>> 2] = n[o >>> 2];
                        else
                            t.push.apply(t, n);
                        return this.sigBytes += e,
                        this;
                    },
                    clamp: function() {
                        var t = this.words
                            , n = this.sigBytes;
                        t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8,
                        t.length = e.ceil(n / 4);
                    },
                    clone: function() {
                        var e = i.clone.call(this);
                        return e.words = this.words.slice(0),
                        e;
                    },
                    random: function(t) {
                        for (var n = [], r = 0; r < t; r += 4)
                            n.push(4294967296 * e.random() | 0);
                        return new a.init(n,t);
                    }
                })
                , s = n.enc = {}
                , c = s.Hex = {
                    stringify: function(e) {
                        var t = e.words;
                        e = e.sigBytes;
                        for (var n = [], r = 0; r < e; r++) {
                            var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;
                            n.push((o >>> 4).toString(16)),
                            n.push((15 & o).toString(16));
                        }
                        return n.join('');
                    },
                    parse: function(e) {
                        for (var t = e.length, n = [], r = 0; r < t; r += 2)
                            n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4;
                        return new a.init(n,t / 2);
                    }
                }
                , u = s.Latin1 = {
                    stringify: function(e) {
                        var t = e.words;
                        e = e.sigBytes;
                        for (var n = [], r = 0; r < e; r++)
                            n.push(String.fromCharCode(t[r >>> 2] >>> 24 - r % 4 * 8 & 255));
                        return n.join('');
                    },
                    parse: function(e) {
                        for (var t = e.length, n = [], r = 0; r < t; r++)
                            n[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;
                        return new a.init(n,t);
                    }
                }
                , l = s.Utf8 = {
                    stringify: function(e) {
                        try {
                            return decodeURIComponent(escape(u.stringify(e)));
                        } catch (e) {
                            throw Error('Malformed UTF-8 data');
                        }
                    },
                    parse: function(e) {
                        return u.parse(unescape(encodeURIComponent(e)));
                    }
                }
                , d = r.BufferedBlockAlgorithm = i.extend({
                    reset: function() {
                        this._data = new a.init,
                        this._nDataBytes = 0;
                    },
                    _append: function(e) {
                        'string' == typeof e && (e = l.parse(e)),
                        this._data.concat(e),
                        this._nDataBytes += e.sigBytes;
                    },
                    _process: function(t) {
                        var n = this._data
                            , r = n.words
                            , o = n.sigBytes
                            , i = this.blockSize
                            , s = o / (4 * i);
                        if (t = (s = t ? e.ceil(s) : e.max((0 | s) - this._minBufferSize, 0)) * i,
                        o = e.min(4 * t, o),
                        t) {
                            for (var c = 0; c < t; c += i)
                                this._doProcessBlock(r, c);
                            c = r.splice(0, t),
                            n.sigBytes -= o;
                        }
                        return new a.init(c,o);
                    },
                    clone: function() {
                        var e = i.clone.call(this);
                        return e._data = this._data.clone(),
                        e;
                    },
                    _minBufferSize: 0
                });
            r.Hasher = d.extend({
                cfg: i.extend(),
                init: function(e) {
                    this.cfg = this.cfg.extend(e),
                    this.reset();
                },
                reset: function() {
                    d.reset.call(this),
                    this._doReset();
                },
                update: function(e) {
                    return this._append(e),
                    this._process(),
                    this;
                },
                finalize: function(e) {
                    return e && this._append(e),
                    this._doFinalize();
                },
                blockSize: 16,
                _createHelper: function(e) {
                    return function(t, n) {
                        return new e.init(n).finalize(t);
                    };
                },
                _createHmacHelper: function(e) {
                    return function(t, n) {
                        return new p.HMAC.init(e,n).finalize(t);
                    };
                }
            });
            var p = n.algo = {};
            return n;
        }(Math);
        o = (s = (r = l).lib).WordArray,
        i = s.Hasher,
        a = [],
        s = r.algo.SHA1 = i.extend({
            _doReset: function() {
                this._hash = new o.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
            },
            _doProcessBlock: function(e, t) {
                for (var n = this._hash.words, r = n[0], o = n[1], i = n[2], s = n[3], c = n[4], u = 0; 80 > u; u++) {
                    if (16 > u)
                        a[u] = 0 | e[t + u];
                    else {
                        var l = a[u - 3] ^ a[u - 8] ^ a[u - 14] ^ a[u - 16];
                        a[u] = l << 1 | l >>> 31;
                    }
                    l = (r << 5 | r >>> 27) + c + a[u],
                    l = 20 > u ? l + (1518500249 + (o & i | ~o & s)) : 40 > u ? l + (1859775393 + (o ^ i ^ s)) : 60 > u ? l + ((o & i | o & s | i & s) - 1894007588) : l + ((o ^ i ^ s) - 899497514),
                    c = s,
                    s = i,
                    i = o << 30 | o >>> 2,
                    o = r,
                    r = l;
                }
                n[0] = n[0] + r | 0,
                n[1] = n[1] + o | 0,
                n[2] = n[2] + i | 0,
                n[3] = n[3] + s | 0,
                n[4] = n[4] + c | 0;
            },
            _doFinalize: function() {
                var e = this._data
                    , t = e.words
                    , n = 8 * this._nDataBytes
                    , r = 8 * e.sigBytes;
                return t[r >>> 5] |= 128 << 24 - r % 32,
                t[14 + (r + 64 >>> 9 << 4)] = Math.floor(n / 4294967296),
                t[15 + (r + 64 >>> 9 << 4)] = n,
                e.sigBytes = 4 * t.length,
                this._process(),
                this._hash;
            },
            clone: function() {
                var e = i.clone.call(this);
                return e._hash = this._hash.clone(),
                e;
            }
        }),
        r.SHA1 = i._createHelper(s),
        r.HmacSHA1 = i._createHmacHelper(s),
        function() {
            var e = l
                , t = e.enc.Utf8;
            e.algo.HMAC = e.lib.Base.extend({
                init: function(e, n) {
                    e = this._hasher = new e.init,
                    'string' == typeof n && (n = t.parse(n));
                    var r = e.blockSize
                        , o = 4 * r;
                    n.sigBytes > o && (n = e.finalize(n)),
                    n.clamp();
                    for (var i = this._oKey = n.clone(), a = this._iKey = n.clone(), s = i.words, c = a.words, u = 0; u < r; u++)
                        s[u] ^= 1549556828,
                        c[u] ^= 909522486;
                    i.sigBytes = a.sigBytes = o,
                    this.reset();
                },
                reset: function() {
                    var e = this._hasher;
                    e.reset(),
                    e.update(this._iKey);
                },
                update: function(e) {
                    return this._hasher.update(e),
                    this;
                },
                finalize: function(e) {
                    var t = this._hasher;
                    return e = t.finalize(e),
                    t.reset(),
                    t.finalize(this._oKey.clone().concat(e));
                }
            });
        }(),
        u = (c = l).lib.WordArray,
        c.enc.Base64 = {
            stringify: function(e) {
                var t = e.words
                    , n = e.sigBytes
                    , r = this._map;
                e.clamp();
                for (var o = [], i = 0; i < n; i += 3)
                    for (var a = (t[i >>> 2] >>> 24 - i % 4 * 8 & 255) << 16 | (t[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255) << 8 | t[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255, s = 0; s < 4 && i + .75 * s < n; s++)
                        o.push(r.charAt(a >>> 6 * (3 - s) & 63));
                var c = r.charAt(64);
                if (c)
                    for (; o.length % 4; )
                        o.push(c);
                return o.join('');
            },
            parse: function(e) {
                var t = e.length
                    , n = this._map
                    , r = n.charAt(64);
                if (r) {
                    var o = e.indexOf(r);
                    -1 != o && (t = o);
                }
                for (var i = [], a = 0, s = 0; s < t; s++)
                    if (s % 4) {
                        var c = n.indexOf(e.charAt(s - 1)) << s % 4 * 2
                            , l = n.indexOf(e.charAt(s)) >>> 6 - s % 4 * 2;
                        i[a >>> 2] |= (c | l) << 24 - a % 4 * 8,
                        a++;
                    }
                return u.create(i, a);
            },
            _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
        },
        e.exports = l;
    }
    , function(e, t, n) {
        var r = n(12).DOMParser
            , o = function() {
                this.version = '1.3.5';
                var e = {
                        mergeCDATA: !0,
                        normalize: !0,
                        stripElemPrefix: !0
                    }
                    , t = new RegExp(/(?!xmlns)^.*:/);
                new RegExp(/^\s+|\s+$/g);
                return this.grokType = function(e) {
                    return /^\s*$/.test(e) ? null : /^(?:true|false)$/i.test(e) ? 'true' === e.toLowerCase() : isFinite(e) ? parseFloat(e) : e;
                }
                ,
                this.parseString = function(e, t) {
                    if (e) {
                        var n = this.stringToXML(e);
                        return n.getElementsByTagName('parsererror').length ? null : this.parseXML(n, t);
                    }
                    return null;
                }
                ,
                this.parseXML = function(n, r) {
                    for (var i in r)
                        e[i] = r[i];
                    var a = {}
                        , s = 0
                        , c = '';
                    if (n.childNodes.length)
                        for (var u, l, d, p = 0; p < n.childNodes.length; p++)
                            4 === (u = n.childNodes.item(p)).nodeType ? e.mergeCDATA && (c += u.nodeValue) : 3 === u.nodeType ? c += u.nodeValue : 1 === u.nodeType && (0 === s && (a = {}),
                            l = e.stripElemPrefix ? u.nodeName.replace(t, '') : u.nodeName,
                            d = o.parseXML(u),
                            a.hasOwnProperty(l) ? (a[l].constructor !== Array && (a[l] = [a[l]]),
                            a[l].push(d)) : (a[l] = d,
                            s++));
                    return Object.keys(a).length || (a = c || ''),
                    a;
                }
                ,
                this.xmlToString = function(e) {
                    try {
                        return e.xml ? e.xml : (new XMLSerializer).serializeToString(e);
                    } catch (e) {
                        return null;
                    }
                }
                ,
                this.stringToXML = function(e) {
                    try {
                        var t = null;
                        return window.DOMParser ? t = (new r).parseFromString(e, 'text/xml') : ((t = new ActiveXObject('Microsoft.XMLDOM')).async = !1,
                        t.loadXML(e),
                        t);
                    } catch (e) {
                        return null;
                    }
                }
                ,
                this;
            }
                .call({});
        e.exports = function(e) {
            return o.parseString(e);
        };
    }
    , function(e, t, n) {
        function r(e) {
            this.options = e || {
                locator: {}
            };
        }
        function o() {
            this.cdata = !1;
        }
        function i(e, t) {
            t.lineNumber = e.lineNumber,
            t.columnNumber = e.columnNumber;
        }
        function a(e) {
            if (e)
                return '\n@' + (e.systemId || '') + '#[line:' + e.lineNumber + ',col:' + e.columnNumber + ']';
        }
        function s(e, t, n) {
            return 'string' == typeof e ? e.substr(t, n) : e.length >= t + n || t ? new java.lang.String(e,t,n) + '' : e;
        }
        function c(e, t) {
            e.currentElement ? e.currentElement.appendChild(t) : e.doc.appendChild(t);
        }
        r.prototype.parseFromString = function(e, t) {
            var n = this.options
                , r = new u
                , i = n.domBuilder || new o
                , s = n.errorHandler
                , c = n.locator
                , l = n.xmlns || {}
                , d = {
                    lt: '<',
                    gt: '>',
                    amp: '&',
                    quot: '"',
                    apos: '\''
                };
            return c && i.setDocumentLocator(c),
            r.errorHandler = function(e, t, n) {
                if (!e) {
                    if (t instanceof o)
                        return t;
                    e = t;
                }
                var r = {}
                    , i = e instanceof Function;
                function s(t) {
                    var o = e[t];
                    !o && i && (o = 2 == e.length ? function(n) {
                        e(t, n);
                    }
                        : e),
                    r[t] = o && function(e) {
                        o('[xmldom ' + t + ']\t' + e + a(n));
                    }
                    || function() {};
                }
                return n = n || {},
                s('warning'),
                s('error'),
                s('fatalError'),
                r;
            }(s, i, c),
            r.domBuilder = n.domBuilder || i,
            /\/x?html?$/.test(t) && (d.nbsp = ' ',
            d.copy = '©',
            l[''] = 'http://www.w3.org/1999/xhtml'),
            l.xml = l.xml || 'http://www.w3.org/XML/1998/namespace',
            e ? r.parse(e, l, d) : r.errorHandler.error('invalid doc source'),
            i.doc;
        }
        ,
        o.prototype = {
            startDocument: function() {
                this.doc = (new l).createDocument(null, null, null),
                this.locator && (this.doc.documentURI = this.locator.systemId);
            },
            startElement: function(e, t, n, r) {
                var o = this.doc
                    , a = o.createElementNS(e, n || t)
                    , s = r.length;
                c(this, a),
                this.currentElement = a,
                this.locator && i(this.locator, a);
                for (var u = 0; u < s; u++) {
                    e = r.getURI(u);
                    var l = r.getValue(u)
                        , d = (n = r.getQName(u),
                        o.createAttributeNS(e, n));
                    this.locator && i(r.getLocator(u), d),
                    d.value = d.nodeValue = l,
                    a.setAttributeNode(d);
                }
            },
            endElement: function(e, t, n) {
                var r = this.currentElement;
                r.tagName;
                this.currentElement = r.parentNode;
            },
            startPrefixMapping: function(e, t) {},
            endPrefixMapping: function(e) {},
            processingInstruction: function(e, t) {
                var n = this.doc.createProcessingInstruction(e, t);
                this.locator && i(this.locator, n),
                c(this, n);
            },
            ignorableWhitespace: function(e, t, n) {},
            characters: function(e, t, n) {
                if (e = s.apply(this, arguments)) {
                    if (this.cdata)
                        var r = this.doc.createCDATASection(e);
                    else
                        r = this.doc.createTextNode(e);
                    this.currentElement ? this.currentElement.appendChild(r) : /^\s*$/.test(e) && this.doc.appendChild(r),
                    this.locator && i(this.locator, r);
                }
            },
            skippedEntity: function(e) {},
            endDocument: function() {
                this.doc.normalize();
            },
            setDocumentLocator: function(e) {
                (this.locator = e) && (e.lineNumber = 0);
            },
            comment: function(e, t, n) {
                e = s.apply(this, arguments);
                var r = this.doc.createComment(e);
                this.locator && i(this.locator, r),
                c(this, r);
            },
            startCDATA: function() {
                this.cdata = !0;
            },
            endCDATA: function() {
                this.cdata = !1;
            },
            startDTD: function(e, t, n) {
                var r = this.doc.implementation;
                if (r && r.createDocumentType) {
                    var o = r.createDocumentType(e, t, n);
                    this.locator && i(this.locator, o),
                    c(this, o);
                }
            },
            warning: function(e) {
                console.warn('[xmldom warning]\t' + e, a(this.locator));
            },
            error: function(e) {
                console.error('[xmldom error]\t' + e, a(this.locator));
            },
            fatalError: function(e) {
                throw console.error('[xmldom fatalError]\t' + e, a(this.locator)),
                e;
            }
        },
        'endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl'.replace(/\w+/g, (function(e) {
            o.prototype[e] = function() {
                return null;
            };
        }
        ));
        var u = n(13).XMLReader
            , l = t.DOMImplementation = n(14).DOMImplementation;
        t.XMLSerializer = n(14).XMLSerializer,
        t.DOMParser = r;
    }
    , function(e, t) {
        var n = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/
            , r = new RegExp('[\\-\\.0-9' + n.source.slice(1, -1) + '\\u00B7\\u0300-\\u036F\\u203F-\\u2040]')
            , o = new RegExp('^' + n.source + r.source + '*(?::' + n.source + r.source + '*)?$');
        function i() {}
        function a(e, t) {
            return t.lineNumber = e.lineNumber,
            t.columnNumber = e.columnNumber,
            t;
        }
        function s(e, t, n, r, o, i) {
            for (var a, s = ++t, c = 0; ; ) {
                var u = e.charAt(s);
                switch (u) {
                    case '=':
                        if (1 === c)
                            a = e.slice(t, s),
                            c = 3;
                        else {
                            if (2 !== c)
                                throw new Error('attribute equal must after attrName');
                            c = 3;
                        }
                        break;
                    case '\'':
                    case '"':
                        if (3 === c || 1 === c) {
                            if (1 === c && (i.warning('attribute value must after "="'),
                            a = e.slice(t, s)),
                            t = s + 1,
                            !((s = e.indexOf(u, t)) > 0))
                                throw new Error('attribute value no end \'' + u + '\' match');
                            l = e.slice(t, s).replace(/&#?\w+;/g, o),
                            n.add(a, l, t - 1),
                            c = 5;
                        } else {
                            if (4 != c)
                                throw new Error('attribute value must after "="');
                            l = e.slice(t, s).replace(/&#?\w+;/g, o),
                            n.add(a, l, t),
                            i.warning('attribute "' + a + '" missed start quot(' + u + ')!!'),
                            t = s + 1,
                            c = 5;
                        }
                        break;
                    case '/':
                        switch (c) {
                            case 0:
                                n.setTagName(e.slice(t, s));
                            case 5:
                            case 6:
                            case 7:
                                c = 7,
                                n.closed = !0;
                            case 4:
                            case 1:
                            case 2:
                                break;
                            default:
                                throw new Error('attribute invalid close char(\'/\')');
                        }
                        break;
                    case '':
                        return i.error('unexpected end of input'),
                        0 == c && n.setTagName(e.slice(t, s)),
                        s;
                    case '>':
                        switch (c) {
                            case 0:
                                n.setTagName(e.slice(t, s));
                            case 5:
                            case 6:
                            case 7:
                                break;
                            case 4:
                            case 1:
                                '/' === (l = e.slice(t, s)).slice(-1) && (n.closed = !0,
                                l = l.slice(0, -1));
                            case 2:
                                2 === c && (l = a),
                                4 == c ? (i.warning('attribute "' + l + '" missed quot(")!!'),
                                n.add(a, l.replace(/&#?\w+;/g, o), t)) : ('http://www.w3.org/1999/xhtml' === r[''] && l.match(/^(?:disabled|checked|selected)$/i) || i.warning('attribute "' + l + '" missed value!! "' + l + '" instead!!'),
                                n.add(l, l, t));
                                break;
                            case 3:
                                throw new Error('attribute value missed!!');
                        }
                        return s;
                    case '':
                        u = ' ';
                    default:
                        if (u <= ' ')
                            switch (c) {
                                case 0:
                                    n.setTagName(e.slice(t, s)),
                                    c = 6;
                                    break;
                                case 1:
                                    a = e.slice(t, s),
                                    c = 2;
                                    break;
                                case 4:
                                    var l = e.slice(t, s).replace(/&#?\w+;/g, o);
                                    i.warning('attribute "' + l + '" missed quot(")!!'),
                                    n.add(a, l, t);
                                case 5:
                                    c = 6;
                            }
                        else
                            switch (c) {
                                case 2:
                                    n.tagName;
                                    'http://www.w3.org/1999/xhtml' === r[''] && a.match(/^(?:disabled|checked|selected)$/i) || i.warning('attribute "' + a + '" missed value!! "' + a + '" instead2!!'),
                                    n.add(a, a, t),
                                    t = s,
                                    c = 1;
                                    break;
                                case 5:
                                    i.warning('attribute space is required"' + a + '"!!');
                                case 6:
                                    c = 1,
                                    t = s;
                                    break;
                                case 3:
                                    c = 4,
                                    t = s;
                                    break;
                                case 7:
                                    throw new Error('elements closed character \'/\' and \'>\' must be connected to');
                            }
                }
                s++;
            }
        }
        function c(e, t, n) {
            for (var r = e.tagName, o = null, i = e.length; i--; ) {
                var a = e[i]
                    , s = a.qName
                    , c = a.value;
                if ((f = s.indexOf(':')) > 0)
                    var u = a.prefix = s.slice(0, f)
                        , l = s.slice(f + 1)
                        , p = 'xmlns' === u && l;
                else
                    l = s,
                    u = null,
                    p = 'xmlns' === s && '';
                a.localName = l,
                !1 !== p && (null == o && (o = {},
                d(n, n = {})),
                n[p] = o[p] = c,
                a.uri = 'http://www.w3.org/2000/xmlns/',
                t.startPrefixMapping(p, c));
            }
            for (i = e.length; i--; ) {
                (u = (a = e[i]).prefix) && ('xml' === u && (a.uri = 'http://www.w3.org/XML/1998/namespace'),
                'xmlns' !== u && (a.uri = n[u || '']));
            }
            var f;
            (f = r.indexOf(':')) > 0 ? (u = e.prefix = r.slice(0, f),
            l = e.localName = r.slice(f + 1)) : (u = null,
            l = e.localName = r);
            var h = e.uri = n[u || ''];
            if (t.startElement(h, l, r, e),
            !e.closed)
                return e.currentNSMap = n,
                e.localNSMap = o,
                !0;
            if (t.endElement(h, l, r),
            o)
                for (u in o)
                    t.endPrefixMapping(u);
        }
        function u(e, t, n, r, o) {
            if (/^(?:script|textarea)$/i.test(n)) {
                var i = e.indexOf('</' + n + '>', t)
                    , a = e.substring(t + 1, i);
                if (/[&<]/.test(a))
                    return /^script$/i.test(n) ? (o.characters(a, 0, a.length),
                    i) : (a = a.replace(/&#?\w+;/g, r),
                    o.characters(a, 0, a.length),
                    i);
            }
            return t + 1;
        }
        function l(e, t, n, r) {
            var o = r[n];
            return null == o && ((o = e.lastIndexOf('</' + n + '>')) < t && (o = e.lastIndexOf('</' + n)),
            r[n] = o),
            o < t;
        }
        function d(e, t) {
            for (var n in e)
                t[n] = e[n];
        }
        function p(e, t, n, r) {
            switch (e.charAt(t + 2)) {
                case '-':
                    return '-' === e.charAt(t + 3) ? (o = e.indexOf('--\x3e', t + 4)) > t ? (n.comment(e, t + 4, o - t - 4),
                    o + 3) : (r.error('Unclosed comment'),
                    -1) : -1;
                default:
                    if ('CDATA[' == e.substr(t + 3, 6)) {
                        var o = e.indexOf(']]>', t + 9);
                        return n.startCDATA(),
                        n.characters(e, t + 9, o - t - 9),
                        n.endCDATA(),
                        o + 3;
                    }
                    var i = function(e, t) {
                            var n, r = [], o = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
                            o.lastIndex = t,
                            o.exec(e);
                            for (; n = o.exec(e); )
                                if (r.push(n),
                                n[1])
                                    return r;
                        }(e, t)
                        , a = i.length;
                    if (a > 1 && /!doctype/i.test(i[0][0])) {
                        var s = i[1][0]
                            , c = a > 3 && /^public$/i.test(i[2][0]) && i[3][0]
                            , u = a > 4 && i[4][0]
                            , l = i[a - 1];
                        return n.startDTD(s, c && c.replace(/^(['"])(.*?)\1$/, '$2'), u && u.replace(/^(['"])(.*?)\1$/, '$2')),
                        n.endDTD(),
                        l.index + l[0].length;
                    }
            }
            return -1;
        }
        function f(e, t, n) {
            var r = e.indexOf('?>', t);
            if (r) {
                var o = e.substring(t, r).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
                if (o) {
                    o[0].length;
                    return n.processingInstruction(o[1], o[2]),
                    r + 2;
                }
                return -1;
            }
            return -1;
        }
        function h(e) {}
        function m(e, t) {
            return e.__proto__ = t,
            e;
        }
        i.prototype = {
            parse: function(e, t, n) {
                var r = this.domBuilder;
                r.startDocument(),
                d(t, t = {}),
                function(e, t, n, r, o) {
                    function i(e) {
                        var t = e.slice(1, -1);
                        return t in n ? n[t] : '#' === t.charAt(0) ? function(e) {
                            if (e > 65535) {
                                var t = 55296 + ((e -= 65536) >> 10)
                                    , n = 56320 + (1023 & e);
                                return String.fromCharCode(t, n);
                            }
                            return String.fromCharCode(e);
                        }(parseInt(t.substr(1).replace('x', '0x'))) : (o.error('entity not found:' + e),
                        e);
                    }
                    function d(t) {
                        if (t > x) {
                            var n = e.substring(x, t).replace(/&#?\w+;/g, i);
                            C && m(x),
                            r.characters(n, 0, t - x),
                            x = t;
                        }
                    }
                    function m(t, n) {
                        for (; t >= y && (n = v.exec(e)); )
                            g = n.index,
                            y = g + n[0].length,
                            C.lineNumber++;
                        C.columnNumber = t - g + 1;
                    }
                    var g = 0
                        , y = 0
                        , v = /.*(?:\r\n?|\n)|.*$/g
                        , C = r.locator
                        , b = [{
                            currentNSMap: t
                        }]
                        , S = {}
                        , x = 0;
                    for (; ; ) {
                        try {
                            var w = e.indexOf('<', x);
                            if (w < 0) {
                                if (!e.substr(x).match(/^\s*$/)) {
                                    var k = r.doc
                                        , T = k.createTextNode(e.substr(x));
                                    k.appendChild(T),
                                    r.currentElement = T;
                                }
                                return;
                            }
                            switch (w > x && d(w),
                            e.charAt(w + 1)) {
                                case '/':
                                    var R = e.indexOf('>', w + 3)
                                        , _ = e.substring(w + 2, R)
                                        , E = b.pop();
                                    R < 0 ? (_ = e.substring(w + 2).replace(/[\s<].*/, ''),
                                    o.error('end tag name: ' + _ + ' is not complete:' + E.tagName),
                                    R = w + 1 + _.length) : _.match(/\s</) && (_ = _.replace(/[\s<].*/, ''),
                                    o.error('end tag name: ' + _ + ' maybe not complete'),
                                    R = w + 1 + _.length);
                                    var A = E.localNSMap
                                        , N = E.tagName == _;
                                    if (N || E.tagName && E.tagName.toLowerCase() == _.toLowerCase()) {
                                        if (r.endElement(E.uri, E.localName, _),
                                        A)
                                            for (var B in A)
                                                r.endPrefixMapping(B);
                                        N || o.fatalError('end tag name: ' + _ + ' is not match the current start tagName:' + E.tagName);
                                    } else
                                        b.push(E);
                                    R++;
                                    break;
                                case '?':
                                    C && m(w),
                                    R = f(e, w, r);
                                    break;
                                case '!':
                                    C && m(w),
                                    R = p(e, w, r, o);
                                    break;
                                default:
                                    C && m(w);
                                    var I = new h
                                        , P = b[b.length - 1].currentNSMap
                                        , D = (R = s(e, w, I, P, i, o),
                                        I.length);
                                    if (!I.closed && l(e, R, I.tagName, S) && (I.closed = !0,
                                    n.nbsp || o.warning('unclosed xml attribute')),
                                    C && D) {
                                        for (var O = a(C, {}), L = 0; L < D; L++) {
                                            var j = I[L];
                                            m(j.offset),
                                            j.locator = a(C, {});
                                        }
                                        r.locator = O,
                                        c(I, r, P) && b.push(I),
                                        r.locator = C;
                                    } else
                                        c(I, r, P) && b.push(I);
                                    'http://www.w3.org/1999/xhtml' !== I.uri || I.closed ? R++ : R = u(e, R, I.tagName, i, r);
                            }
                        } catch (e) {
                            o.error('element parse error: ' + e),
                            R = -1;
                        }
                        R > x ? x = R : d(Math.max(w, x) + 1);
                    }
                }(e, t, n, r, this.errorHandler),
                r.endDocument();
            }
        },
        h.prototype = {
            setTagName: function(e) {
                if (!o.test(e))
                    throw new Error('invalid tagName:' + e);
                this.tagName = e;
            },
            add: function(e, t, n) {
                if (!o.test(e))
                    throw new Error('invalid attribute:' + e);
                this[this.length++] = {
                    qName: e,
                    value: t,
                    offset: n
                };
            },
            length: 0,
            getLocalName: function(e) {
                return this[e].localName;
            },
            getLocator: function(e) {
                return this[e].locator;
            },
            getQName: function(e) {
                return this[e].qName;
            },
            getURI: function(e) {
                return this[e].uri;
            },
            getValue: function(e) {
                return this[e].value;
            }
        },
        m({}, m.prototype)instanceof m || (m = function(e, t) {
            function n() {}
            for (t in n.prototype = t,
            n = new n,
            e)
                n[t] = e[t];
            return n;
        }
        ),
        t.XMLReader = i;
    }
    , function(e, t) {
        function n(e, t) {
            for (var n in e)
                t[n] = e[n];
        }
        function r(e, t) {
            var r = e.prototype;
            if (Object.create) {
                var o = Object.create(t.prototype);
                r.__proto__ = o;
            }
            if (!(r instanceof t)) {
                function i() {}
                i.prototype = t.prototype,
                n(r, i = new i),
                e.prototype = r = i;
            }
            r.constructor != e && ('function' != typeof e && console.error('unknow Class:' + e),
            r.constructor = e);
        }
        var o = {}
            , i = o.ELEMENT_NODE = 1
            , a = o.ATTRIBUTE_NODE = 2
            , s = o.TEXT_NODE = 3
            , c = o.CDATA_SECTION_NODE = 4
            , u = o.ENTITY_REFERENCE_NODE = 5
            , l = o.ENTITY_NODE = 6
            , d = o.PROCESSING_INSTRUCTION_NODE = 7
            , p = o.COMMENT_NODE = 8
            , f = o.DOCUMENT_NODE = 9
            , h = o.DOCUMENT_TYPE_NODE = 10
            , m = o.DOCUMENT_FRAGMENT_NODE = 11
            , g = o.NOTATION_NODE = 12
            , y = {}
            , v = {}
            , C = (y.INDEX_SIZE_ERR = (v[1] = 'Index size error',
            1),
            y.DOMSTRING_SIZE_ERR = (v[2] = 'DOMString size error',
            2),
            y.HIERARCHY_REQUEST_ERR = (v[3] = 'Hierarchy request error',
            3))
            , b = (y.WRONG_DOCUMENT_ERR = (v[4] = 'Wrong document',
            4),
            y.INVALID_CHARACTER_ERR = (v[5] = 'Invalid character',
            5),
            y.NO_DATA_ALLOWED_ERR = (v[6] = 'No data allowed',
            6),
            y.NO_MODIFICATION_ALLOWED_ERR = (v[7] = 'No modification allowed',
            7),
            y.NOT_FOUND_ERR = (v[8] = 'Not found',
            8))
            , S = (y.NOT_SUPPORTED_ERR = (v[9] = 'Not supported',
            9),
            y.INUSE_ATTRIBUTE_ERR = (v[10] = 'Attribute in use',
            10));
        y.INVALID_STATE_ERR = (v[11] = 'Invalid state',
        11),
        y.SYNTAX_ERR = (v[12] = 'Syntax error',
        12),
        y.INVALID_MODIFICATION_ERR = (v[13] = 'Invalid modification',
        13),
        y.NAMESPACE_ERR = (v[14] = 'Invalid namespace',
        14),
        y.INVALID_ACCESS_ERR = (v[15] = 'Invalid access',
        15);
        function x(e, t) {
            if (t instanceof Error)
                var n = t;
            else
                n = this,
                Error.call(this, v[e]),
                this.message = v[e],
                Error.captureStackTrace && Error.captureStackTrace(this, x);
            return n.code = e,
            t && (this.message = this.message + ': ' + t),
            n;
        }
        function w() {}
        function k(e, t) {
            this._node = e,
            this._refresh = t,
            T(this);
        }
        function T(e) {
            var t = e._node._inc || e._node.ownerDocument._inc;
            if (e._inc != t) {
                var r = e._refresh(e._node);
                te(e, 'length', r.length),
                n(r, e),
                e._inc = t;
            }
        }
        function R() {}
        function _(e, t) {
            for (var n = e.length; n--; )
                if (e[n] === t)
                    return n;
        }
        function E(e, t, n, r) {
            if (r ? t[_(t, r)] = n : t[t.length++] = n,
            e) {
                n.ownerElement = e;
                var o = e.ownerDocument;
                o && (r && O(o, e, r),
                function(e, t, n) {
                    e && e._inc++,
                    'http://www.w3.org/2000/xmlns/' == n.namespaceURI && (t._nsMap[n.prefix ? n.localName : ''] = n.value);
                }(o, e, n));
            }
        }
        function A(e, t, n) {
            var r = _(t, n);
            if (!(r >= 0))
                throw x(b, new Error(e.tagName + '@' + n));
            for (var o = t.length - 1; r < o; )
                t[r] = t[++r];
            if (t.length = o,
            e) {
                var i = e.ownerDocument;
                i && (O(i, e, n),
                n.ownerElement = null);
            }
        }
        function N(e) {
            if (this._features = {},
            e)
                for (var t in e)
                    this._features = e[t];
        }
        function B() {}
        function I(e) {
            return ('<' == e ? '&lt;' : '>' == e && '&gt;') || '&' == e && '&amp;' || '"' == e && '&quot;' || '&#' + e.charCodeAt() + ';';
        }
        function P(e, t) {
            if (t(e))
                return !0;
            if (e = e.firstChild)
                do {
                    if (P(e, t))
                        return !0;
                } while (e = e.nextSibling);
        }
        function D() {}
        function O(e, t, n, r) {
            e && e._inc++,
            'http://www.w3.org/2000/xmlns/' == n.namespaceURI && delete t._nsMap[n.prefix ? n.localName : ''];
        }
        function L(e, t, n) {
            if (e && e._inc) {
                e._inc++;
                var r = t.childNodes;
                if (n)
                    r[r.length++] = n;
                else {
                    for (var o = t.firstChild, i = 0; o; )
                        r[i++] = o,
                        o = o.nextSibling;
                    r.length = i;
                }
            }
        }
        function j(e, t) {
            var n = t.previousSibling
                , r = t.nextSibling;
            return n ? n.nextSibling = r : e.firstChild = r,
            r ? r.previousSibling = n : e.lastChild = n,
            L(e.ownerDocument, e),
            t;
        }
        function U(e, t, n) {
            var r = t.parentNode;
            if (r && r.removeChild(t),
            t.nodeType === m) {
                var o = t.firstChild;
                if (null == o)
                    return t;
                var i = t.lastChild;
            } else
                o = i = t;
            var a = n ? n.previousSibling : e.lastChild;
            o.previousSibling = a,
            i.nextSibling = n,
            a ? a.nextSibling = o : e.firstChild = o,
            null == n ? e.lastChild = i : n.previousSibling = i;
            do {
                o.parentNode = e;
            } while (o !== i && (o = o.nextSibling));return L(e.ownerDocument || e, e),
            t.nodeType == m && (t.firstChild = t.lastChild = null),
            t;
        }
        function M() {
            this._nsMap = {};
        }
        function H() {}
        function F() {}
        function K() {}
        function q() {}
        function z() {}
        function X() {}
        function G() {}
        function V() {}
        function W() {}
        function $() {}
        function J() {}
        function Q() {}
        function Y(e, t) {
            var n = []
                , r = 9 == this.nodeType ? this.documentElement : this
                , o = r.prefix
                , i = r.namespaceURI;
            if (i && null == o && null == (o = r.lookupPrefix(i)))
                var a = [{
                    namespace: i,
                    prefix: null
                }];
            return ee(this, n, e, t, a),
            n.join('');
        }
        function Z(e, t, n) {
            var r = e.prefix || ''
                , o = e.namespaceURI;
            if (!r && !o)
                return !1;
            if ('xml' === r && 'http://www.w3.org/XML/1998/namespace' === o || 'http://www.w3.org/2000/xmlns/' == o)
                return !1;
            for (var i = n.length; i--; ) {
                var a = n[i];
                if (a.prefix == r)
                    return a.namespace != o;
            }
            return !0;
        }
        function ee(e, t, n, r, o) {
            if (r) {
                if (!(e = r(e)))
                    return;
                if ('string' == typeof e)
                    return void t.push(e);
            }
            switch (e.nodeType) {
                case i:
                    o || (o = []);
                    o.length;
                    var l = e.attributes
                        , g = l.length
                        , y = e.firstChild
                        , v = e.tagName;
                    n = 'http://www.w3.org/1999/xhtml' === e.namespaceURI || n,
                    t.push('<', v);
                    for (var C = 0; C < g; C++) {
                        'xmlns' == (b = l.item(C)).prefix ? o.push({
                            prefix: b.localName,
                            namespace: b.value
                        }) : 'xmlns' == b.nodeName && o.push({
                            prefix: '',
                            namespace: b.value
                        });
                    }
                    for (C = 0; C < g; C++) {
                        var b;
                        if (Z(b = l.item(C), 0, o)) {
                            var S = b.prefix || ''
                                , x = b.namespaceURI
                                , w = S ? ' xmlns:' + S : ' xmlns';
                            t.push(w, '="', x, '"'),
                            o.push({
                                prefix: S,
                                namespace: x
                            });
                        }
                        ee(b, t, n, r, o);
                    }
                    if (Z(e, 0, o)) {
                        S = e.prefix || '',
                        x = e.namespaceURI,
                        w = S ? ' xmlns:' + S : ' xmlns';
                        t.push(w, '="', x, '"'),
                        o.push({
                            prefix: S,
                            namespace: x
                        });
                    }
                    if (y || n && !/^(?:meta|link|img|br|hr|input)$/i.test(v)) {
                        if (t.push('>'),
                        n && /^script$/i.test(v))
                            for (; y; )
                                y.data ? t.push(y.data) : ee(y, t, n, r, o),
                                y = y.nextSibling;
                        else
                            for (; y; )
                                ee(y, t, n, r, o),
                                y = y.nextSibling;
                        t.push('</', v, '>');
                    } else
                        t.push('/>');
                    return;
                case f:
                case m:
                    for (y = e.firstChild; y; )
                        ee(y, t, n, r, o),
                        y = y.nextSibling;
                    return;
                case a:
                    return t.push(' ', e.name, '="', e.value.replace(/[<&"]/g, I), '"');
                case s:
                    return t.push(e.data.replace(/[<&]/g, I));
                case c:
                    return t.push('<![CDATA[', e.data, ']]>');
                case p:
                    return t.push('\x3c!--', e.data, '--\x3e');
                case h:
                    var k = e.publicId
                        , T = e.systemId;
                    if (t.push('<!DOCTYPE ', e.name),
                    k)
                        t.push(' PUBLIC "', k),
                        T && '.' != T && t.push('" "', T),
                        t.push('">');
                    else if (T && '.' != T)
                        t.push(' SYSTEM "', T, '">');
                    else {
                        var R = e.internalSubset;
                        R && t.push(' [', R, ']'),
                        t.push('>');
                    }
                    return;
                case d:
                    return t.push('<?', e.target, ' ', e.data, '?>');
                case u:
                    return t.push('&', e.nodeName, ';');
                default:
                    t.push('??', e.nodeName);
            }
        }
        function te(e, t, n) {
            e[t] = n;
        }
        x.prototype = Error.prototype,
        n(y, x),
        w.prototype = {
            length: 0,
            item: function(e) {
                return this[e] || null;
            },
            toString: function(e, t) {
                for (var n = [], r = 0; r < this.length; r++)
                    ee(this[r], n, e, t);
                return n.join('');
            }
        },
        k.prototype.item = function(e) {
            return T(this),
            this[e];
        }
        ,
        r(k, w),
        R.prototype = {
            length: 0,
            item: w.prototype.item,
            getNamedItem: function(e) {
                for (var t = this.length; t--; ) {
                    var n = this[t];
                    if (n.nodeName == e)
                        return n;
                }
            },
            setNamedItem: function(e) {
                var t = e.ownerElement;
                if (t && t != this._ownerElement)
                    throw new x(S);
                var n = this.getNamedItem(e.nodeName);
                return E(this._ownerElement, this, e, n),
                n;
            },
            setNamedItemNS: function(e) {
                var t, n = e.ownerElement;
                if (n && n != this._ownerElement)
                    throw new x(S);
                return t = this.getNamedItemNS(e.namespaceURI, e.localName),
                E(this._ownerElement, this, e, t),
                t;
            },
            removeNamedItem: function(e) {
                var t = this.getNamedItem(e);
                return A(this._ownerElement, this, t),
                t;
            },
            removeNamedItemNS: function(e, t) {
                var n = this.getNamedItemNS(e, t);
                return A(this._ownerElement, this, n),
                n;
            },
            getNamedItemNS: function(e, t) {
                for (var n = this.length; n--; ) {
                    var r = this[n];
                    if (r.localName == t && r.namespaceURI == e)
                        return r;
                }
                return null;
            }
        },
        N.prototype = {
            hasFeature: function(e, t) {
                var n = this._features[e.toLowerCase()];
                return !(!n || t && !(t in n));
            },
            createDocument: function(e, t, n) {
                var r = new D;
                if (r.implementation = this,
                r.childNodes = new w,
                r.doctype = n,
                n && r.appendChild(n),
                t) {
                    var o = r.createElementNS(e, t);
                    r.appendChild(o);
                }
                return r;
            },
            createDocumentType: function(e, t, n) {
                var r = new X;
                return r.name = e,
                r.nodeName = e,
                r.publicId = t,
                r.systemId = n,
                r;
            }
        },
        B.prototype = {
            firstChild: null,
            lastChild: null,
            previousSibling: null,
            nextSibling: null,
            attributes: null,
            parentNode: null,
            childNodes: null,
            ownerDocument: null,
            nodeValue: null,
            namespaceURI: null,
            prefix: null,
            localName: null,
            insertBefore: function(e, t) {
                return U(this, e, t);
            },
            replaceChild: function(e, t) {
                this.insertBefore(e, t),
                t && this.removeChild(t);
            },
            removeChild: function(e) {
                return j(this, e);
            },
            appendChild: function(e) {
                return this.insertBefore(e, null);
            },
            hasChildNodes: function() {
                return null != this.firstChild;
            },
            cloneNode: function(e) {
                return function e(t, n, r) {
                    var o = new n.constructor;
                    for (var s in n) {
                        var c = n[s];
                        'object' != typeof c && c != o[s] && (o[s] = c);
                    }
                    n.childNodes && (o.childNodes = new w);
                    switch (o.ownerDocument = t,
                    o.nodeType) {
                        case i:
                            var u = n.attributes
                                , l = o.attributes = new R
                                , d = u.length;
                            l._ownerElement = o;
                            for (var p = 0; p < d; p++)
                                o.setAttributeNode(e(t, u.item(p), !0));
                            break;
                        case a:
                            r = !0;
                    }
                    if (r)
                        for (var f = n.firstChild; f; )
                            o.appendChild(e(t, f, r)),
                            f = f.nextSibling;
                    return o;
                }(this.ownerDocument || this, this, e);
            },
            normalize: function() {
                for (var e = this.firstChild; e; ) {
                    var t = e.nextSibling;
                    t && t.nodeType == s && e.nodeType == s ? (this.removeChild(t),
                    e.appendData(t.data)) : (e.normalize(),
                    e = t);
                }
            },
            isSupported: function(e, t) {
                return this.ownerDocument.implementation.hasFeature(e, t);
            },
            hasAttributes: function() {
                return this.attributes.length > 0;
            },
            lookupPrefix: function(e) {
                for (var t = this; t; ) {
                    var n = t._nsMap;
                    if (n)
                        for (var r in n)
                            if (n[r] == e)
                                return r;
                    t = t.nodeType == a ? t.ownerDocument : t.parentNode;
                }
                return null;
            },
            lookupNamespaceURI: function(e) {
                for (var t = this; t; ) {
                    var n = t._nsMap;
                    if (n && e in n)
                        return n[e];
                    t = t.nodeType == a ? t.ownerDocument : t.parentNode;
                }
                return null;
            },
            isDefaultNamespace: function(e) {
                return null == this.lookupPrefix(e);
            }
        },
        n(o, B),
        n(o, B.prototype),
        D.prototype = {
            nodeName: '#document',
            nodeType: f,
            doctype: null,
            documentElement: null,
            _inc: 1,
            insertBefore: function(e, t) {
                if (e.nodeType == m) {
                    for (var n = e.firstChild; n; ) {
                        var r = n.nextSibling;
                        this.insertBefore(n, t),
                        n = r;
                    }
                    return e;
                }
                return null == this.documentElement && e.nodeType == i && (this.documentElement = e),
                U(this, e, t),
                e.ownerDocument = this,
                e;
            },
            removeChild: function(e) {
                return this.documentElement == e && (this.documentElement = null),
                j(this, e);
            },
            importNode: function(e, t) {
                return function e(t, n, r) {
                    var o;
                    switch (n.nodeType) {
                        case i:
                            (o = n.cloneNode(!1)).ownerDocument = t;
                        case m:
                            break;
                        case a:
                            r = !0;
                    }
                    o || (o = n.cloneNode(!1));
                    if (o.ownerDocument = t,
                    o.parentNode = null,
                    r)
                        for (var s = n.firstChild; s; )
                            o.appendChild(e(t, s, r)),
                            s = s.nextSibling;
                    return o;
                }(this, e, t);
            },
            getElementById: function(e) {
                var t = null;
                return P(this.documentElement, (function(n) {
                    if (n.nodeType == i && n.getAttribute('id') == e)
                        return t = n,
                        !0;
                }
                )),
                t;
            },
            createElement: function(e) {
                var t = new M;
                return t.ownerDocument = this,
                t.nodeName = e,
                t.tagName = e,
                t.childNodes = new w,
                (t.attributes = new R)._ownerElement = t,
                t;
            },
            createDocumentFragment: function() {
                var e = new $;
                return e.ownerDocument = this,
                e.childNodes = new w,
                e;
            },
            createTextNode: function(e) {
                var t = new K;
                return t.ownerDocument = this,
                t.appendData(e),
                t;
            },
            createComment: function(e) {
                var t = new q;
                return t.ownerDocument = this,
                t.appendData(e),
                t;
            },
            createCDATASection: function(e) {
                var t = new z;
                return t.ownerDocument = this,
                t.appendData(e),
                t;
            },
            createProcessingInstruction: function(e, t) {
                var n = new J;
                return n.ownerDocument = this,
                n.tagName = n.target = e,
                n.nodeValue = n.data = t,
                n;
            },
            createAttribute: function(e) {
                var t = new H;
                return t.ownerDocument = this,
                t.name = e,
                t.nodeName = e,
                t.localName = e,
                t.specified = !0,
                t;
            },
            createEntityReference: function(e) {
                var t = new W;
                return t.ownerDocument = this,
                t.nodeName = e,
                t;
            },
            createElementNS: function(e, t) {
                var n = new M
                    , r = t.split(':')
                    , o = n.attributes = new R;
                return n.childNodes = new w,
                n.ownerDocument = this,
                n.nodeName = t,
                n.tagName = t,
                n.namespaceURI = e,
                2 == r.length ? (n.prefix = r[0],
                n.localName = r[1]) : n.localName = t,
                o._ownerElement = n,
                n;
            },
            createAttributeNS: function(e, t) {
                var n = new H
                    , r = t.split(':');
                return n.ownerDocument = this,
                n.nodeName = t,
                n.name = t,
                n.namespaceURI = e,
                n.specified = !0,
                2 == r.length ? (n.prefix = r[0],
                n.localName = r[1]) : n.localName = t,
                n;
            }
        },
        r(D, B),
        M.prototype = {
            nodeType: i,
            hasAttribute: function(e) {
                return null != this.getAttributeNode(e);
            },
            getAttribute: function(e) {
                var t = this.getAttributeNode(e);
                return t && t.value || '';
            },
            getAttributeNode: function(e) {
                return this.attributes.getNamedItem(e);
            },
            setAttribute: function(e, t) {
                var n = this.ownerDocument.createAttribute(e);
                n.value = n.nodeValue = '' + t,
                this.setAttributeNode(n);
            },
            removeAttribute: function(e) {
                var t = this.getAttributeNode(e);
                t && this.removeAttributeNode(t);
            },
            appendChild: function(e) {
                return e.nodeType === m ? this.insertBefore(e, null) : function(e, t) {
                    var n = t.parentNode;
                    if (n) {
                        var r = e.lastChild;
                        n.removeChild(t);
                        r = e.lastChild;
                    }
                    return r = e.lastChild,
                    t.parentNode = e,
                    t.previousSibling = r,
                    t.nextSibling = null,
                    r ? r.nextSibling = t : e.firstChild = t,
                    e.lastChild = t,
                    L(e.ownerDocument, e, t),
                    t;
                }(this, e);
            },
            setAttributeNode: function(e) {
                return this.attributes.setNamedItem(e);
            },
            setAttributeNodeNS: function(e) {
                return this.attributes.setNamedItemNS(e);
            },
            removeAttributeNode: function(e) {
                return this.attributes.removeNamedItem(e.nodeName);
            },
            removeAttributeNS: function(e, t) {
                var n = this.getAttributeNodeNS(e, t);
                n && this.removeAttributeNode(n);
            },
            hasAttributeNS: function(e, t) {
                return null != this.getAttributeNodeNS(e, t);
            },
            getAttributeNS: function(e, t) {
                var n = this.getAttributeNodeNS(e, t);
                return n && n.value || '';
            },
            setAttributeNS: function(e, t, n) {
                var r = this.ownerDocument.createAttributeNS(e, t);
                r.value = r.nodeValue = '' + n,
                this.setAttributeNode(r);
            },
            getAttributeNodeNS: function(e, t) {
                return this.attributes.getNamedItemNS(e, t);
            },
            getElementsByTagName: function(e) {
                return new k(this,(function(t) {
                    var n = [];
                    return P(t, (function(r) {
                        r === t || r.nodeType != i || '*' !== e && r.tagName != e || n.push(r);
                    }
                    )),
                    n;
                }
                ));
            },
            getElementsByTagNameNS: function(e, t) {
                return new k(this,(function(n) {
                    var r = [];
                    return P(n, (function(o) {
                        o === n || o.nodeType !== i || '*' !== e && o.namespaceURI !== e || '*' !== t && o.localName != t || r.push(o);
                    }
                    )),
                    r;
                }
                ));
            }
        },
        D.prototype.getElementsByTagName = M.prototype.getElementsByTagName,
        D.prototype.getElementsByTagNameNS = M.prototype.getElementsByTagNameNS,
        r(M, B),
        H.prototype.nodeType = a,
        r(H, B),
        F.prototype = {
            data: '',
            substringData: function(e, t) {
                return this.data.substring(e, e + t);
            },
            appendData: function(e) {
                e = this.data + e,
                this.nodeValue = this.data = e,
                this.length = e.length;
            },
            insertData: function(e, t) {
                this.replaceData(e, 0, t);
            },
            appendChild: function(e) {
                throw new Error(v[C]);
            },
            deleteData: function(e, t) {
                this.replaceData(e, t, '');
            },
            replaceData: function(e, t, n) {
                n = this.data.substring(0, e) + n + this.data.substring(e + t),
                this.nodeValue = this.data = n,
                this.length = n.length;
            }
        },
        r(F, B),
        K.prototype = {
            nodeName: '#text',
            nodeType: s,
            splitText: function(e) {
                var t = this.data
                    , n = t.substring(e);
                t = t.substring(0, e),
                this.data = this.nodeValue = t,
                this.length = t.length;
                var r = this.ownerDocument.createTextNode(n);
                return this.parentNode && this.parentNode.insertBefore(r, this.nextSibling),
                r;
            }
        },
        r(K, F),
        q.prototype = {
            nodeName: '#comment',
            nodeType: p
        },
        r(q, F),
        z.prototype = {
            nodeName: '#cdata-section',
            nodeType: c
        },
        r(z, F),
        X.prototype.nodeType = h,
        r(X, B),
        G.prototype.nodeType = g,
        r(G, B),
        V.prototype.nodeType = l,
        r(V, B),
        W.prototype.nodeType = u,
        r(W, B),
        $.prototype.nodeName = '#document-fragment',
        $.prototype.nodeType = m,
        r($, B),
        J.prototype.nodeType = d,
        r(J, B),
        Q.prototype.serializeToString = function(e, t, n) {
            return Y.call(e, t, n);
        }
        ,
        B.prototype.toString = Y;
        try {
            if (Object.defineProperty) {
                Object.defineProperty(k.prototype, 'length', {
                    get: function() {
                        return T(this),
                        this.$$length;
                    }
                }),
                Object.defineProperty(B.prototype, 'textContent', {
                    get: function() {
                        return function e(t) {
                            switch (t.nodeType) {
                                case i:
                                case m:
                                    var n = [];
                                    for (t = t.firstChild; t; )
                                        7 !== t.nodeType && 8 !== t.nodeType && n.push(e(t)),
                                        t = t.nextSibling;
                                    return n.join('');
                                default:
                                    return t.nodeValue;
                            }
                        }(this);
                    },
                    set: function(e) {
                        switch (this.nodeType) {
                            case i:
                            case m:
                                for (; this.firstChild; )
                                    this.removeChild(this.firstChild);
                                (e || String(e)) && this.appendChild(this.ownerDocument.createTextNode(e));
                                break;
                            default:
                                this.data = e,
                                this.value = e,
                                this.nodeValue = e;
                        }
                    }
                }),
                te = function(e, t, n) {
                    e['$$' + t] = n;
                };
            }
        } catch (e) {}
        t.DOMImplementation = N,
        t.XMLSerializer = Q;
    }
    , function(e, t) {
        var n = new RegExp('^([^a-zA-Z_À-ÖØ-öø-ÿͰ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿿、-퟿豈-﷏ﷰ-�])|^((x|X)(m|M)(l|L))|([^a-zA-Z_À-ÖØ-öø-ÿͰ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿿、-퟿豈-﷏ﷰ-�-.0-9·̀-ͯ‿⁀])','g')
            , r = /[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm
            , o = function(e) {
                var t = [];
                if (e instanceof Object)
                    for (var n in e)
                        e.hasOwnProperty(n) && t.push(n);
                return t;
            }
            , i = function(e, t) {
                var i = function(e, r, o, i, a) {
                    var s = void 0 !== t.indent ? t.indent : '\t'
                        , c = t.prettyPrint ? '\n' + new Array(i).join(s) : '';
                    t.removeIllegalNameCharacters && (e = e.replace(n, '_'));
                    var u = [c, '<', e, o || ''];
                    return r && r.length > 0 ? (u.push('>'),
                    u.push(r),
                    a && u.push(c),
                    u.push('</'),
                    u.push(e),
                    u.push('>')) : u.push('/>'),
                    u.join('');
                };
                return function e(n, a, s) {
                    var c = typeof n;
                    switch ((Array.isArray ? Array.isArray(n) : n instanceof Array) ? c = 'array' : n instanceof Date && (c = 'date'),
                    c) {
                        case 'array':
                            var u = [];
                            return n.map((function(t) {
                                u.push(e(t, 1, s + 1));
                            }
                            )),
                            t.prettyPrint && u.push('\n'),
                            u.join('');
                        case 'date':
                            return n.toJSON ? n.toJSON() : n + '';
                        case 'object':
                            var l = [];
                            for (var d in n)
                                if (n.hasOwnProperty(d))
                                    if (n[d]instanceof Array)
                                        for (var p = 0; p < n[d].length; p++)
                                            n[d].hasOwnProperty(p) && l.push(i(d, e(n[d][p], 0, s + 1), null, s + 1, o(n[d][p]).length));
                                    else
                                        l.push(i(d, e(n[d], 0, s + 1), null, s + 1));
                            return t.prettyPrint && l.length > 0 && l.push('\n'),
                            l.join('');
                        case 'function':
                            return n();
                        default:
                            return t.escape ? ('' + n).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&apos;').replace(/"/g, '&quot;').replace(r, '') : '' + n;
                    }
                }(e, 0, 0);
            }
            , a = function(e) {
                var t = ['<?xml version="1.0" encoding="UTF-8"'];
                return e && t.push(' standalone="yes"'),
                t.push('?>'),
                t.join('');
            };
        e.exports = function(e, t) {
            if (t || (t = {
                xmlHeader: {
                    standalone: !0
                },
                prettyPrint: !0,
                indent: '  ',
                escape: !0
            }),
            'string' == typeof e)
                try {
                    e = JSON.parse(e.toString());
                } catch (e) {
                    return !1;
                }
            var n = ''
                , r = '';
            return t && ('object' == typeof t ? (t.xmlHeader && (n = a(!!t.xmlHeader.standalone)),
            void 0 !== t.docType && (r = '<!DOCTYPE ' + t.docType + '>')) : n = a()),
            [n, (t = t || {}).prettyPrint && r ? '\n' : '', r, i(e, t)].join('').replace(/\n{2,}/g, '\n').replace(/\s+$/g, '');
        };
    }
    , function(e, t) {
        var n = function(e) {
            var t = {}
                , n = function(e) {
                    return !t[e] && (t[e] = []),
                    t[e];
                };
            e.on = function(e, t) {
                'task-list-update' === e && console.warn('warning: Event "' + e + '" has been deprecated. Please use "list-update" instead.'),
                n(e).push(t);
            }
            ,
            e.off = function(e, t) {
                for (var r = n(e), o = r.length - 1; o >= 0; o--)
                    t === r[o] && r.splice(o, 1);
            }
            ,
            e.emit = function(e, t) {
                for (var r = n(e).map((function(e) {
                        return e;
                    }
                    )), o = 0; o < r.length; o++)
                    r[o](t);
            };
        };
        e.exports.init = n,
        e.exports.EventProxy = function() {
            n(this);
        };
    }
    , function(e, t, n) {
        var r = n(18)
            , o = n(8)
            , i = {};
        e.exports.transferToTaskMethod = function(e, t) {
            i[t] = e[t],
            e[t] = function(e, n) {
                e.SkipTask ? i[t].call(this, e, n) : this._addTask(t, e, n);
            };
        }
        ,
        e.exports.init = function(e) {
            var t, n, a = [], s = {}, c = 0, u = 0, l = function(e) {
                    var t = {
                        id: e.id,
                        Bucket: e.Bucket,
                        Region: e.Region,
                        Key: e.Key,
                        FilePath: e.FilePath,
                        state: e.state,
                        loaded: e.loaded,
                        size: e.size,
                        speed: e.speed,
                        percent: e.percent,
                        hashPercent: e.hashPercent,
                        error: e.error
                    };
                    return e.FilePath && (t.FilePath = e.FilePath),
                    e._custom && (t._custom = e._custom),
                    t;
                }, d = (n = function() {
                    t = 0,
                    e.emit('task-list-update', {
                        list: o.map(a, l)
                    }),
                    e.emit('list-update', {
                        list: o.map(a, l)
                    });
                }
                ,
                function() {
                    t || (t = setTimeout(n));
                }
                ), p = function() {
                    if (!(a.length <= e.options.UploadQueueSize)) {
                        for (var t = 0; t < u && t < a.length && a.length > e.options.UploadQueueSize; ) {
                            var n = 'waiting' === a[t].state || 'checking' === a[t].state || 'uploading' === a[t].state;
                            a[t] && n ? t++ : (s[a[t].id] && delete s[a[t].id],
                            a.splice(t, 1),
                            u--);
                        }
                        d();
                    }
                }, f = function() {
                    if (!(c >= e.options.FileParallelLimit)) {
                        for (; a[u] && 'waiting' !== a[u].state; )
                            u++;
                        if (!(u >= a.length)) {
                            var t = a[u];
                            u++,
                            c++,
                            t.state = 'checking',
                            t.params.onTaskStart && t.params.onTaskStart(l(t)),
                            !t.params.UploadData && (t.params.UploadData = {});
                            var n = o.formatParams(t.api, t.params);
                            i[t.api].call(e, n, (function(n, r) {
                                e._isRunningTask(t.id) && ('checking' !== t.state && 'uploading' !== t.state || (t.state = n ? 'error' : 'success',
                                n && (t.error = n),
                                c--,
                                d(),
                                f(),
                                t.callback && t.callback(n, r),
                                'success' === t.state && (t.params && (delete t.params.UploadData,
                                delete t.params.Body,
                                delete t.params),
                                delete t.callback)),
                                p());
                            }
                            )),
                            d(),
                            setTimeout(f);
                        }
                    }
                }, h = function(t, n) {
                    var o = s[t];
                    if (o) {
                        var i = o && 'waiting' === o.state
                            , a = o && ('checking' === o.state || 'uploading' === o.state);
                        if ('canceled' === n && 'canceled' !== o.state || 'paused' === n && i || 'paused' === n && a) {
                            if ('paused' === n && o.params.Body && 'function' == typeof o.params.Body.pipe)
                                return void console.error('stream not support pause');
                            o.state = n,
                            e.emit('inner-kill-task', {
                                TaskId: t,
                                toState: n
                            });
                            try {
                                var u = o && o.params && o.params.UploadData.UploadId;
                            } catch (e) {}
                            'canceled' === n && u && r.removeUsing(u),
                            d(),
                            a && (c--,
                            f()),
                            'canceled' === n && (o.params && (delete o.params.UploadData,
                            delete o.params.Body,
                            delete o.params),
                            delete o.callback);
                        }
                        p();
                    }
                };
            e._addTasks = function(t) {
                o.each(t, (function(t) {
                    e._addTask(t.api, t.params, t.callback, !0);
                }
                )),
                d();
            }
            ;
            var m = !0;
            e._addTask = function(t, n, r, i) {
                n = o.formatParams(t, n);
                var c = o.uuid();
                n.TaskId = c,
                n.onTaskReady && n.onTaskReady(c),
                n.TaskReady && (n.TaskReady(c),
                m && console.warn('warning: Param "TaskReady" has been deprecated. Please use "onTaskReady" instead.'),
                m = !1);
                var u = {
                        params: n,
                        callback: r,
                        api: t,
                        index: a.length,
                        id: c,
                        Bucket: n.Bucket,
                        Region: n.Region,
                        Key: n.Key,
                        FilePath: n.FilePath || '',
                        state: 'waiting',
                        loaded: 0,
                        size: 0,
                        speed: 0,
                        percent: 0,
                        hashPercent: 0,
                        error: null,
                        _custom: n._custom
                    }
                    , l = n.onHashProgress;
                n.onHashProgress = function(t) {
                    e._isRunningTask(u.id) && (u.hashPercent = t.percent,
                    l && l(t),
                    d());
                }
                ;
                var h = n.onProgress;
                return n.onProgress = function(t) {
                    e._isRunningTask(u.id) && ('checking' === u.state && (u.state = 'uploading'),
                    u.loaded = t.loaded,
                    u.speed = t.speed,
                    u.percent = t.percent,
                    h && h(t),
                    d());
                }
                ,
                o.getFileSize(t, n, (function(e, t) {
                    e ? r(e) : (s[c] = u,
                    a.push(u),
                    u.size = t,
                    !i && d(),
                    f(),
                    p());
                }
                )),
                c;
            }
            ,
            e._isRunningTask = function(e) {
                var t = s[e];
                return !(!t || 'checking' !== t.state && 'uploading' !== t.state);
            }
            ,
            e.getTaskList = function() {
                return o.map(a, l);
            }
            ,
            e.cancelTask = function(e) {
                h(e, 'canceled');
            }
            ,
            e.pauseTask = function(e) {
                h(e, 'paused');
            }
            ,
            e.restartTask = function(e) {
                var t = s[e];
                !t || 'paused' !== t.state && 'error' !== t.state || (t.state = 'waiting',
                d(),
                u = Math.min(u, t.index),
                f());
            }
            ,
            e.isUploadRunning = function() {
                return c || u < a.length;
            };
        };
    }
    , function(e, t, n) {
        var r, o, i = n(8), a = 'cos_sdk_upload_cache', s = function() {
                if (!r) {
                    r = JSON.parse(localStorage.getItem(a) || '[]') || [];
                    for (var e = !1, t = Math.round(Date.now() / 1e3), n = r.length - 1; n >= 0; n--) {
                        var o = r[n][2];
                        (!o || o + 2592e3 < t) && (r.splice(n, 1),
                        e = !0);
                    }
                    e && localStorage.setItem(a, JSON.stringify(r));
                }
            }, c = function() {
                o || (o = setTimeout((function() {
                    localStorage.setItem(a, JSON.stringify(r)),
                    o = null;
                }
                ), 400));
            }, u = {
                using: {},
                setUsing: function(e) {
                    u.using[e] = !0;
                },
                removeUsing: function(e) {
                    delete u.using[e];
                },
                getFileId: function(e, t, n, r) {
                    return e.name && e.size && e.lastModifiedDate && t ? i.md5([e.name, e.size, e.lastModifiedDate, t, n, r].join('::')) : null;
                },
                getUploadIdList: function(e) {
                    if (!e)
                        return null;
                    s();
                    for (var t = [], n = 0; n < r.length; n++)
                        r[n][0] === e && t.push(r[n][1]);
                    return t.length ? t : null;
                },
                saveUploadId: function(e, t, n) {
                    if (s(),
                    e) {
                        for (var o = r.length - 1; o >= 0; o--) {
                            var i = r[o];
                            i[0] === e && i[1] === t && r.splice(o, 1);
                        }
                        r.unshift([e, t, Math.round(Date.now() / 1e3)]),
                        r.length > n && r.splice(n),
                        c();
                    }
                },
                removeUploadId: function(e) {
                    s(),
                    delete u.using[e];
                    for (var t = r.length - 1; t >= 0; t--)
                        r[t][1] === e && r.splice(t, 1);
                    c();
                }
            };
        e.exports = u;
    }
    , function(e, t, n) {
        var r = n(20)
            , o = n(8);
        function i(e) {
            var t = {
                    GrantFullControl: [],
                    GrantWrite: [],
                    GrantRead: [],
                    GrantReadAcp: [],
                    GrantWriteAcp: [],
                    ACL: ''
                }
                , n = {
                    FULL_CONTROL: 'GrantFullControl',
                    WRITE: 'GrantWrite',
                    READ: 'GrantRead',
                    READ_ACP: 'GrantReadAcp',
                    WRITE_ACP: 'GrantWriteAcp'
                }
                , r = (e && e.AccessControlList || {}).Grant;
            r && (r = o.isArray(r) ? r : [r]);
            var i = {
                READ: 0,
                WRITE: 0,
                FULL_CONTROL: 0
            };
            return r && r.length && o.each(r, (function(r) {
                'qcs::cam::anyone:anyone' === r.Grantee.ID || 'http://cam.qcloud.com/groups/global/AllUsers' === r.Grantee.URI ? i[r.Permission] = 1 : r.Grantee.ID !== e.Owner.ID && t[n[r.Permission]].push('id="' + r.Grantee.ID + '"');
            }
            )),
            i.FULL_CONTROL || i.WRITE && i.READ ? t.ACL = 'public-read-write' : i.READ ? t.ACL = 'public-read' : t.ACL = 'private',
            o.each(n, (function(e) {
                t[e] = a(t[e].join(','));
            }
            )),
            t;
        }
        function a(e) {
            var t, n, r = e.split(','), o = {};
            for (t = 0; t < r.length; )
                o[n = r[t].trim()] ? r.splice(t, 1) : (o[n] = !0,
                r[t] = n,
                t++);
            return r.join(',');
        }
        function s(e) {
            var t = e.bucket
                , n = t.substr(0, t.lastIndexOf('-'))
                , r = t.substr(t.lastIndexOf('-') + 1)
                , i = e.domain
                , a = e.region
                , s = e.object
                , c = e.protocol || (o.isBrowser && 'http:' === location.protocol ? 'http:' : 'https:');
            i || (i = ['cn-south', 'cn-south-2', 'cn-north', 'cn-east', 'cn-southwest', 'sg'].indexOf(a) > -1 ? '{Region}.myqcloud.com' : 'cos.{Region}.myqcloud.com',
            e.ForcePathStyle || (i = '{Bucket}.' + i)),
            i = (i = i.replace(/\{\{AppId\}\}/gi, r).replace(/\{\{Bucket\}\}/gi, n).replace(/\{\{Region\}\}/gi, a).replace(/\{\{.*?\}\}/gi, '')).replace(/\{AppId\}/gi, r).replace(/\{BucketName\}/gi, n).replace(/\{Bucket\}/gi, t).replace(/\{Region\}/gi, a).replace(/\{.*?\}/gi, ''),
            /^[a-zA-Z]+:\/\//.test(i) || (i = c + '//' + i),
            '/' === i.slice(-1) && (i = i.slice(0, -1));
            var u = i;
            return e.ForcePathStyle && (u += '/' + t),
            u += '/',
            s && (u += o.camSafeUrlEncode(s).replace(/%2F/g, '/')),
            e.isLocation && (u = u.replace(/^https?:\/\//, '')),
            u;
        }
        function c(e, t) {
            var n = o.clone(e.Headers);
            delete n['Content-Type'],
            delete n['Cache-Control'],
            o.each(n, (function(e, t) {
                '' === e && delete n[t];
            }
            ));
            var r = function(e) {
                    var n = !1
                        , r = e.Authorization;
                    if (r)
                        if (r.indexOf(' ') > -1)
                            n = !1;
                        else if (r.indexOf('q-sign-algorithm=') > -1 && r.indexOf('q-ak=') > -1 && r.indexOf('q-sign-time=') > -1 && r.indexOf('q-key-time=') > -1 && r.indexOf('q-url-param-list=') > -1)
                            n = !0;
                        else
                            try {
                                (r = atob(r)).indexOf('a=') > -1 && r.indexOf('k=') > -1 && r.indexOf('t=') > -1 && r.indexOf('r=') > -1 && r.indexOf('b=') > -1 && (n = !0);
                            } catch (e) {}
                    n ? t && t(null, e) : t && t('authorization error');
                }
                , i = this
                , a = e.Bucket || ''
                , s = e.Region || ''
                , c = e.Key || '';
            i.options.ForcePathStyle && a && (c = a + '/' + c);
            var u = '/' + c
                , l = {}
                , d = e.Scope;
            if (!d) {
                var p = e.Action || ''
                    , f = e.ResourceKey || e.Key || '';
                d = e.Scope || [{
                    action: p,
                    bucket: a,
                    region: s,
                    prefix: f
                }];
            }
            var h = o.md5(JSON.stringify(d));
            i._StsCache = i._StsCache || [],
            function() {
                var e, t;
                for (e = i._StsCache.length - 1; e >= 0; e--) {
                    t = i._StsCache[e];
                    var n = Math.round(o.getSkewTime(i.options.SystemClockOffset) / 1e3) + 30;
                    if (t.StartTime && n < t.StartTime || n >= t.ExpiredTime)
                        i._StsCache.splice(e, 1);
                    else if (!t.ScopeLimit || t.ScopeLimit && t.ScopeKey === h) {
                        l = t;
                        break;
                    }
                }
            }();
            var m, g = function() {
                var t = l.StartTime && l.ExpiredTime ? l.StartTime + ';' + l.ExpiredTime : ''
                    , a = {
                        Authorization: o.getAuth({
                            SecretId: l.TmpSecretId,
                            SecretKey: l.TmpSecretKey,
                            Method: e.Method,
                            Pathname: u,
                            Query: e.Query,
                            Headers: n,
                            Expires: e.Expires,
                            UseRawKey: i.options.UseRawKey,
                            SystemClockOffset: i.options.SystemClockOffset,
                            KeyTime: t
                        }),
                        XCosSecurityToken: l.XCosSecurityToken || '',
                        Token: l.Token || '',
                        ClientIP: l.ClientIP || '',
                        ClientUA: l.ClientUA || ''
                    };
                r(a);
            };
            if (l.ExpiredTime && l.ExpiredTime - o.getSkewTime(i.options.SystemClockOffset) / 1e3 > 60)
                g();
            else if (i.options.getAuthorization)
                i.options.getAuthorization.call(i, {
                    Bucket: a,
                    Region: s,
                    Method: e.Method,
                    Key: c,
                    Pathname: u,
                    Query: e.Query,
                    Headers: n,
                    Scope: d
                }, (function(e) {
                    'string' == typeof e && (e = {
                        Authorization: e
                    }),
                    e.TmpSecretId && e.TmpSecretKey && e.XCosSecurityToken && e.ExpiredTime ? ((l = e || {}).Scope = d,
                    l.ScopeKey = h,
                    i._StsCache.push(l),
                    g()) : r(e);
                }
                ));
            else {
                if (!i.options.getSTS)
                    return m = {
                        Authorization: o.getAuth({
                            SecretId: e.SecretId || i.options.SecretId,
                            SecretKey: e.SecretKey || i.options.SecretKey,
                            Method: e.Method,
                            Pathname: u,
                            Query: e.Query,
                            Headers: n,
                            Expires: e.Expires,
                            UseRawKey: i.options.UseRawKey,
                            SystemClockOffset: i.options.SystemClockOffset
                        }),
                        XCosSecurityToken: i.options.XCosSecurityToken
                    },
                    r(m),
                    m;
                i.options.getSTS.call(i, {
                    Bucket: a,
                    Region: s
                }, (function(e) {
                    (l = e || {}).Scope = d,
                    l.ScopeKey = h,
                    l.TmpSecretId = l.SecretId,
                    l.TmpSecretKey = l.SecretKey,
                    i._StsCache.push(l),
                    g();
                }
                ));
            }
            return '';
        }
        function u(e) {
            var t = !1
                , n = !1
                , r = e.headers && (e.headers.date || e.headers.Date) || e.error && e.error.ServerTime;
            try {
                var i = e.error.Code
                    , a = e.error.Message;
                ('RequestTimeTooSkewed' === i || 'AccessDenied' === i && 'Request has expired' === a) && (n = !0);
            } catch (e) {}
            if (e)
                if (n && r) {
                    var s = Date.parse(r);
                    this.options.CorrectClockSkew && Math.abs(o.getSkewTime(this.options.SystemClockOffset) - s) >= 3e4 && (console.error('error: Local time is too skewed.'),
                    this.options.SystemClockOffset = s - Date.now(),
                    t = !0);
                } else
                    5 === Math.round(e.statusCode / 100) && (t = !0);
            return t;
        }
        function l(e, t) {
            var n = this;
            !e.headers && (e.headers = {}),
            !e.qs && (e.qs = {}),
            e.VersionId && (e.qs.versionId = e.VersionId),
            e.qs = o.clearKey(e.qs),
            e.headers && (e.headers = o.clearKey(e.headers)),
            e.qs && (e.qs = o.clearKey(e.qs));
            var r = o.clone(e.qs);
            e.action && (r[e.action] = '');
            var i = function(o) {
                var a = n.options.SystemClockOffset;
                c.call(n, {
                    Bucket: e.Bucket || '',
                    Region: e.Region || '',
                    Method: e.method,
                    Key: e.Key,
                    Query: r,
                    Headers: e.headers,
                    Action: e.Action,
                    ResourceKey: e.ResourceKey,
                    Scope: e.Scope
                }, (function(r, s) {
                    r ? t(r) : (e.AuthData = s,
                    d.call(n, e, (function(r, s) {
                        r && o < 2 && (a !== n.options.SystemClockOffset || u.call(n, r)) ? (e.headers && (delete e.headers.Authorization,
                        delete e.headers.token,
                        delete e.headers.clientIP,
                        delete e.headers.clientUA,
                        delete e.headers['x-cos-security-token']),
                        i(o + 1)) : t(r, s);
                    }
                    )));
                }
                ));
            };
            i(1);
        }
        function d(e, t) {
            var n = this
                , i = e.TaskId;
            if (!i || n._isRunningTask(i)) {
                var a = e.Bucket
                    , c = e.Region
                    , u = e.Key
                    , l = e.method || 'GET'
                    , d = e.url
                    , p = e.body
                    , f = e.json
                    , h = e.rawBody;
                d = d || s({
                    ForcePathStyle: n.options.ForcePathStyle,
                    protocol: n.options.Protocol,
                    domain: n.options.Domain,
                    bucket: a,
                    region: c,
                    object: u
                }),
                e.action && (d = d + '?' + e.action);
                var m = {
                    method: l,
                    url: d,
                    headers: e.headers,
                    qs: e.qs,
                    body: p,
                    json: f
                };
                if (m.headers.Authorization = e.AuthData.Authorization,
                e.AuthData.Token && (m.headers.token = e.AuthData.Token),
                e.AuthData.ClientIP && (m.headers.clientIP = e.AuthData.ClientIP),
                e.AuthData.ClientUA && (m.headers.clientUA = e.AuthData.ClientUA),
                e.AuthData.XCosSecurityToken && (m.headers['x-cos-security-token'] = e.AuthData.XCosSecurityToken),
                m.headers && (m.headers = o.clearKey(m.headers)),
                m = o.clearKey(m),
                e.onProgress && 'function' == typeof e.onProgress) {
                    var g = p && (p.size || p.length) || 0;
                    m.onProgress = function(t) {
                        if (!i || n._isRunningTask(i)) {
                            var r = t ? t.loaded : 0;
                            e.onProgress({
                                loaded: r,
                                total: g
                            });
                        }
                    };
                }
                this.options.Timeout && (m.timeout = this.options.Timeout),
                n.emit('before-send', m);
                var y = r(m, (function(e, r, a) {
                        if ('abort' !== e) {
                            var s, c = function(e, a) {
                                if (i && n.off('inner-kill-task', v),
                                !s) {
                                    s = !0;
                                    var c = {};
                                    r && r.statusCode && (c.statusCode = r.statusCode),
                                    r && r.headers && (c.headers = r.headers),
                                    e ? (e = o.extend(e || {}, c),
                                    t(e, null)) : (a = o.extend(a || {}, c),
                                    t(null, a)),
                                    y = null;
                                }
                            };
                            if (e)
                                c({
                                    error: e
                                });
                            else {
                                var u;
                                if (h)
                                    (u = {}).body = a;
                                else
                                    try {
                                        u = a && a.indexOf('<') > -1 && a.indexOf('>') > -1 && o.xml2json(a) || {};
                                    } catch (e) {
                                        u = a || {};
                                    }
                                var l = r.statusCode;
                                2 === Math.floor(l / 100) ? u.Error ? c({
                                    error: u.Error
                                }) : c(null, u) : c({
                                    error: u.Error || u
                                });
                            }
                        }
                    }
                    ))
                    , v = function(e) {
                        e.TaskId === i && (y && y.abort && y.abort(),
                        n.off('inner-kill-task', v));
                    };
                i && n.on('inner-kill-task', v);
            }
        }
        var p = {
            getService: function(e, t) {
                'function' == typeof e && (t = e,
                e = {});
                var n = this.options.Protocol || (o.isBrowser && 'http:' === location.protocol ? 'http:' : 'https:')
                    , r = this.options.ServiceDomain
                    , i = e.Region;
                r ? (r = r.replace(/\{Region\}/gi, i || '').replace(/\{.*?\}/gi, ''),
                /^[a-zA-Z]+:\/\//.test(r) || (r = n + '//' + r),
                '/' === r.slice(-1) && (r = r.slice(0, -1))) : r = i ? n + '//cos.' + i + '.myqcloud.com' : n + '//service.cos.myqcloud.com',
                l.call(this, {
                    Action: 'name/cos:GetService',
                    url: r,
                    method: 'GET',
                    headers: e.Headers
                }, (function(e, n) {
                    if (e)
                        return t(e);
                    var r = n && n.ListAllMyBucketsResult && n.ListAllMyBucketsResult.Buckets && n.ListAllMyBucketsResult.Buckets.Bucket || [];
                    r = o.isArray(r) ? r : [r];
                    var i = n && n.ListAllMyBucketsResult && n.ListAllMyBucketsResult.Owner || {};
                    t(null, {
                        Buckets: r,
                        Owner: i,
                        statusCode: n.statusCode,
                        headers: n.headers
                    });
                }
                ));
            },
            putBucket: function(e, t) {
                var n = this;
                l.call(this, {
                    Action: 'name/cos:PutBucket',
                    method: 'PUT',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers
                }, (function(r, o) {
                    if (r)
                        return t(r);
                    var i = s({
                        protocol: n.options.Protocol,
                        domain: n.options.Domain,
                        bucket: e.Bucket,
                        region: e.Region,
                        isLocation: !0
                    });
                    t(null, {
                        Location: i,
                        statusCode: o.statusCode,
                        headers: o.headers
                    });
                }
                ));
            },
            headBucket: function(e, t) {
                l.call(this, {
                    Action: 'name/cos:HeadBucket',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    method: 'HEAD'
                }, (function(e, n) {
                    t(e, n);
                }
                ));
            },
            getBucket: function(e, t) {
                var n = {};
                n.prefix = e.Prefix || '',
                n.delimiter = e.Delimiter,
                n.marker = e.Marker,
                n['max-keys'] = e.MaxKeys,
                n['encoding-type'] = e.EncodingType,
                l.call(this, {
                    Action: 'name/cos:GetBucket',
                    ResourceKey: n.prefix,
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    qs: n
                }, (function(e, n) {
                    if (e)
                        return t(e);
                    var r = n.ListBucketResult || {}
                        , i = r.Contents || []
                        , a = r.CommonPrefixes || [];
                    i = o.isArray(i) ? i : [i],
                    a = o.isArray(a) ? a : [a];
                    var s = o.clone(r);
                    o.extend(s, {
                        Contents: i,
                        CommonPrefixes: a,
                        statusCode: n.statusCode,
                        headers: n.headers
                    }),
                    t(null, s);
                }
                ));
            },
            deleteBucket: function(e, t) {
                l.call(this, {
                    Action: 'name/cos:DeleteBucket',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    method: 'DELETE'
                }, (function(e, n) {
                    return e && 204 === e.statusCode ? t(null, {
                        statusCode: e.statusCode
                    }) : e ? t(e) : void t(null, {
                        statusCode: n.statusCode,
                        headers: n.headers
                    });
                }
                ));
            },
            putBucketAcl: function(e, t) {
                var n = e.Headers
                    , r = '';
                if (e.AccessControlPolicy) {
                    var i = o.clone(e.AccessControlPolicy || {})
                        , s = i.Grants || i.Grant;
                    s = o.isArray(s) ? s : [s],
                    delete i.Grant,
                    delete i.Grants,
                    i.AccessControlList = {
                        Grant: s
                    },
                    r = o.json2xml({
                        AccessControlPolicy: i
                    }),
                    n['Content-Type'] = 'application/xml',
                    n['Content-MD5'] = o.binaryBase64(o.md5(r));
                }
                o.each(n, (function(e, t) {
                    0 === t.indexOf('x-cos-grant-') && (n[t] = a(n[t]));
                }
                )),
                l.call(this, {
                    Action: 'name/cos:PutBucketACL',
                    method: 'PUT',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: n,
                    action: 'acl',
                    body: r
                }, (function(e, n) {
                    if (e)
                        return t(e);
                    t(null, {
                        statusCode: n.statusCode,
                        headers: n.headers
                    });
                }
                ));
            },
            getBucketAcl: function(e, t) {
                l.call(this, {
                    Action: 'name/cos:GetBucketACL',
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'acl'
                }, (function(e, n) {
                    if (e)
                        return t(e);
                    var r = n.AccessControlPolicy || {}
                        , a = r.Owner || {}
                        , s = r.AccessControlList.Grant || [];
                    s = o.isArray(s) ? s : [s];
                    var c = i(r);
                    n.headers && n.headers['x-cos-acl'] && (c.ACL = n.headers['x-cos-acl']),
                    c = o.extend(c, {
                        Owner: a,
                        Grants: s,
                        statusCode: n.statusCode,
                        headers: n.headers
                    }),
                    t(null, c);
                }
                ));
            },
            putBucketCors: function(e, t) {
                var n = (e.CORSConfiguration || {}).CORSRules || e.CORSRules || [];
                n = o.clone(o.isArray(n) ? n : [n]),
                o.each(n, (function(e) {
                    o.each(['AllowedOrigin', 'AllowedHeader', 'AllowedMethod', 'ExposeHeader'], (function(t, n) {
                        var r = t + 's'
                            , i = e[r] || e[t] || [];
                        delete e[r],
                        e[t] = o.isArray(i) ? i : [i];
                    }
                    ));
                }
                ));
                var r = o.json2xml({
                        CORSConfiguration: {
                            CORSRule: n
                        }
                    })
                    , i = e.Headers;
                i['Content-Type'] = 'application/xml',
                i['Content-MD5'] = o.binaryBase64(o.md5(r)),
                l.call(this, {
                    Action: 'name/cos:PutBucketCORS',
                    method: 'PUT',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    body: r,
                    action: 'cors',
                    headers: i
                }, (function(e, n) {
                    if (e)
                        return t(e);
                    t(null, {
                        statusCode: n.statusCode,
                        headers: n.headers
                    });
                }
                ));
            },
            getBucketCors: function(e, t) {
                l.call(this, {
                    Action: 'name/cos:GetBucketCORS',
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'cors'
                }, (function(e, n) {
                    if (e)
                        if (404 === e.statusCode && e.error && 'NoSuchCORSConfiguration' === e.error.Code) {
                            var r = {
                                CORSRules: [],
                                statusCode: e.statusCode
                            };
                            e.headers && (r.headers = e.headers),
                            t(null, r);
                        } else
                            t(e);
                    else {
                        var i = n.CORSConfiguration || {}
                            , a = i.CORSRules || i.CORSRule || [];
                        a = o.clone(o.isArray(a) ? a : [a]),
                        o.each(a, (function(e) {
                            o.each(['AllowedOrigin', 'AllowedHeader', 'AllowedMethod', 'ExposeHeader'], (function(t, n) {
                                var r = t + 's'
                                    , i = e[r] || e[t] || [];
                                delete e[t],
                                e[r] = o.isArray(i) ? i : [i];
                            }
                            ));
                        }
                        )),
                        t(null, {
                            CORSRules: a,
                            statusCode: n.statusCode,
                            headers: n.headers
                        });
                    }
                }
                ));
            },
            deleteBucketCors: function(e, t) {
                l.call(this, {
                    Action: 'name/cos:DeleteBucketCORS',
                    method: 'DELETE',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'cors'
                }, (function(e, n) {
                    return e && 204 === e.statusCode ? t(null, {
                        statusCode: e.statusCode
                    }) : e ? t(e) : void t(null, {
                        statusCode: n.statusCode || e.statusCode,
                        headers: n.headers
                    });
                }
                ));
            },
            getBucketLocation: function(e, t) {
                l.call(this, {
                    Action: 'name/cos:GetBucketLocation',
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'location'
                }, (function(e, n) {
                    if (e)
                        return t(e);
                    t(null, n);
                }
                ));
            },
            getBucketPolicy: function(e, t) {
                l.call(this, {
                    Action: 'name/cos:GetBucketPolicy',
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'policy',
                    rawBody: !0
                }, (function(e, n) {
                    if (e)
                        return e.statusCode && 403 === e.statusCode ? t({
                            ErrorStatus: 'Access Denied'
                        }) : e.statusCode && 405 === e.statusCode ? t({
                            ErrorStatus: 'Method Not Allowed'
                        }) : e.statusCode && 404 === e.statusCode ? t({
                            ErrorStatus: 'Policy Not Found'
                        }) : t(e);
                    var r = {};
                    try {
                        r = JSON.parse(n.body);
                    } catch (e) {}
                    t(null, {
                        Policy: r,
                        statusCode: n.statusCode,
                        headers: n.headers
                    });
                }
                ));
            },
            putBucketPolicy: function(e, t) {
                var n = e.Policy
                    , r = n;
                try {
                    'string' == typeof n ? n = JSON.parse(r) : r = JSON.stringify(n);
                } catch (e) {
                    t({
                        error: 'Policy format error'
                    });
                }
                var i = e.Headers;
                i['Content-Type'] = 'application/json',
                i['Content-MD5'] = o.binaryBase64(o.md5(r)),
                l.call(this, {
                    Action: 'name/cos:PutBucketPolicy',
                    method: 'PUT',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    action: 'policy',
                    body: o.isBrowser ? r : n,
                    headers: i,
                    json: !0
                }, (function(e, n) {
                    return e && 204 === e.statusCode ? t(null, {
                        statusCode: e.statusCode
                    }) : e ? t(e) : void t(null, {
                        statusCode: n.statusCode,
                        headers: n.headers
                    });
                }
                ));
            },
            deleteBucketPolicy: function(e, t) {
                l.call(this, {
                    Action: 'name/cos:DeleteBucketPolicy',
                    method: 'DELETE',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'policy'
                }, (function(e, n) {
                    return e && 204 === e.statusCode ? t(null, {
                        statusCode: e.statusCode
                    }) : e ? t(e) : void t(null, {
                        statusCode: n.statusCode || e.statusCode,
                        headers: n.headers
                    });
                }
                ));
            },
            putBucketTagging: function(e, t) {
                var n = e.Tagging || {}
                    , r = n.TagSet || n.Tags || e.Tags || [];
                r = o.clone(o.isArray(r) ? r : [r]);
                var i = o.json2xml({
                        Tagging: {
                            TagSet: {
                                Tag: r
                            }
                        }
                    })
                    , a = e.Headers;
                a['Content-Type'] = 'application/xml',
                a['Content-MD5'] = o.binaryBase64(o.md5(i)),
                l.call(this, {
                    Action: 'name/cos:PutBucketTagging',
                    method: 'PUT',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    body: i,
                    action: 'tagging',
                    headers: a
                }, (function(e, n) {
                    return e && 204 === e.statusCode ? t(null, {
                        statusCode: e.statusCode
                    }) : e ? t(e) : void t(null, {
                        statusCode: n.statusCode,
                        headers: n.headers
                    });
                }
                ));
            },
            getBucketTagging: function(e, t) {
                l.call(this, {
                    Action: 'name/cos:GetBucketTagging',
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'tagging'
                }, (function(e, n) {
                    if (e)
                        if (404 !== e.statusCode || !e.error || 'Not Found' !== e.error && 'NoSuchTagSet' !== e.error.Code)
                            t(e);
                        else {
                            var r = {
                                Tags: [],
                                statusCode: e.statusCode
                            };
                            e.headers && (r.headers = e.headers),
                            t(null, r);
                        }
                    else {
                        var i = [];
                        try {
                            i = n.Tagging.TagSet.Tag || [];
                        } catch (e) {}
                        i = o.clone(o.isArray(i) ? i : [i]),
                        t(null, {
                            Tags: i,
                            statusCode: n.statusCode,
                            headers: n.headers
                        });
                    }
                }
                ));
            },
            deleteBucketTagging: function(e, t) {
                l.call(this, {
                    Action: 'name/cos:DeleteBucketTagging',
                    method: 'DELETE',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'tagging'
                }, (function(e, n) {
                    return e && 204 === e.statusCode ? t(null, {
                        statusCode: e.statusCode
                    }) : e ? t(e) : void t(null, {
                        statusCode: n.statusCode,
                        headers: n.headers
                    });
                }
                ));
            },
            putBucketLifecycle: function(e, t) {
                var n = (e.LifecycleConfiguration || {}).Rules || e.Rules || [];
                n = o.clone(n);
                var r = o.json2xml({
                        LifecycleConfiguration: {
                            Rule: n
                        }
                    })
                    , i = e.Headers;
                i['Content-Type'] = 'application/xml',
                i['Content-MD5'] = o.binaryBase64(o.md5(r)),
                l.call(this, {
                    Action: 'name/cos:PutBucketLifecycle',
                    method: 'PUT',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    body: r,
                    action: 'lifecycle',
                    headers: i
                }, (function(e, n) {
                    return e && 204 === e.statusCode ? t(null, {
                        statusCode: e.statusCode
                    }) : e ? t(e) : void t(null, {
                        statusCode: n.statusCode,
                        headers: n.headers
                    });
                }
                ));
            },
            getBucketLifecycle: function(e, t) {
                l.call(this, {
                    Action: 'name/cos:GetBucketLifecycle',
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'lifecycle'
                }, (function(e, n) {
                    if (e)
                        if (404 === e.statusCode && e.error && 'NoSuchLifecycleConfiguration' === e.error.Code) {
                            var r = {
                                Rules: [],
                                statusCode: e.statusCode
                            };
                            e.headers && (r.headers = e.headers),
                            t(null, r);
                        } else
                            t(e);
                    else {
                        var i = [];
                        try {
                            i = n.LifecycleConfiguration.Rule || [];
                        } catch (e) {}
                        i = o.clone(o.isArray(i) ? i : [i]),
                        t(null, {
                            Rules: i,
                            statusCode: n.statusCode,
                            headers: n.headers
                        });
                    }
                }
                ));
            },
            deleteBucketLifecycle: function(e, t) {
                l.call(this, {
                    Action: 'name/cos:DeleteBucketLifecycle',
                    method: 'DELETE',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'lifecycle'
                }, (function(e, n) {
                    return e && 204 === e.statusCode ? t(null, {
                        statusCode: e.statusCode
                    }) : e ? t(e) : void t(null, {
                        statusCode: n.statusCode,
                        headers: n.headers
                    });
                }
                ));
            },
            putBucketVersioning: function(e, t) {
                if (e.VersioningConfiguration) {
                    var n = e.VersioningConfiguration || {}
                        , r = o.json2xml({
                            VersioningConfiguration: n
                        })
                        , i = e.Headers;
                    i['Content-Type'] = 'application/xml',
                    i['Content-MD5'] = o.binaryBase64(o.md5(r)),
                    l.call(this, {
                        Action: 'name/cos:PutBucketVersioning',
                        method: 'PUT',
                        Bucket: e.Bucket,
                        Region: e.Region,
                        body: r,
                        action: 'versioning',
                        headers: i
                    }, (function(e, n) {
                        return e && 204 === e.statusCode ? t(null, {
                            statusCode: e.statusCode
                        }) : e ? t(e) : void t(null, {
                            statusCode: n.statusCode,
                            headers: n.headers
                        });
                    }
                    ));
                } else
                    t({
                        error: 'missing param VersioningConfiguration'
                    });
            },
            getBucketVersioning: function(e, t) {
                l.call(this, {
                    Action: 'name/cos:GetBucketVersioning',
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'versioning'
                }, (function(e, n) {
                    e || !n.VersioningConfiguration && (n.VersioningConfiguration = {}),
                    t(e, n);
                }
                ));
            },
            putBucketReplication: function(e, t) {
                var n = o.clone(e.ReplicationConfiguration)
                    , r = o.json2xml({
                        ReplicationConfiguration: n
                    });
                r = (r = r.replace(/<(\/?)Rules>/gi, '<$1Rule>')).replace(/<(\/?)Tags>/gi, '<$1Tag>');
                var i = e.Headers;
                i['Content-Type'] = 'application/xml',
                i['Content-MD5'] = o.binaryBase64(o.md5(r)),
                l.call(this, {
                    Action: 'name/cos:PutBucketReplication',
                    method: 'PUT',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    body: r,
                    action: 'replication',
                    headers: i
                }, (function(e, n) {
                    return e && 204 === e.statusCode ? t(null, {
                        statusCode: e.statusCode
                    }) : e ? t(e) : void t(null, {
                        statusCode: n.statusCode,
                        headers: n.headers
                    });
                }
                ));
            },
            getBucketReplication: function(e, t) {
                l.call(this, {
                    Action: 'name/cos:GetBucketReplication',
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'replication'
                }, (function(e, n) {
                    if (e)
                        if (404 !== e.statusCode || !e.error || 'Not Found' !== e.error && 'ReplicationConfigurationnotFoundError' !== e.error.Code)
                            t(e);
                        else {
                            var r = {
                                ReplicationConfiguration: {
                                    Rules: []
                                },
                                statusCode: e.statusCode
                            };
                            e.headers && (r.headers = e.headers),
                            t(null, r);
                        }
                    else
                        e || !n.ReplicationConfiguration && (n.ReplicationConfiguration = {}),
                        n.ReplicationConfiguration.Rule && (n.ReplicationConfiguration.Rules = n.ReplicationConfiguration.Rule,
                        delete n.ReplicationConfiguration.Rule),
                        t(e, n);
                }
                ));
            },
            deleteBucketReplication: function(e, t) {
                l.call(this, {
                    Action: 'name/cos:DeleteBucketReplication',
                    method: 'DELETE',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'replication'
                }, (function(e, n) {
                    return e && 204 === e.statusCode ? t(null, {
                        statusCode: e.statusCode
                    }) : e ? t(e) : void t(null, {
                        statusCode: n.statusCode,
                        headers: n.headers
                    });
                }
                ));
            },
            putBucketWebsite: function(e, t) {
                if (e.WebsiteConfiguration) {
                    var n = o.clone(e.WebsiteConfiguration || {})
                        , r = n.RoutingRules || n.RoutingRule || [];
                    r = o.isArray(r) ? r : [r],
                    delete n.RoutingRule,
                    delete n.RoutingRules,
                    r.length > 0 && (n.RoutingRules = {
                        RoutingRule: r
                    });
                    var i = o.json2xml({
                            WebsiteConfiguration: n
                        })
                        , a = e.Headers;
                    a['Content-Type'] = 'application/xml',
                    a['Content-MD5'] = o.binaryBase64(o.md5(i)),
                    l.call(this, {
                        Action: 'name/cos:PutBucketWebsite',
                        method: 'PUT',
                        Bucket: e.Bucket,
                        Region: e.Region,
                        body: i,
                        action: 'website',
                        headers: a
                    }, (function(e, n) {
                        return e && 204 === e.statusCode ? t(null, {
                            statusCode: e.statusCode
                        }) : e ? t(e) : void t(null, {
                            statusCode: n.statusCode,
                            headers: n.headers
                        });
                    }
                    ));
                } else
                    t({
                        error: 'missing param WebsiteConfiguration'
                    });
            },
            getBucketWebsite: function(e, t) {
                l.call(this, {
                    Action: 'name/cos:GetBucketWebsite',
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    headers: e.Headers,
                    action: 'website'
                }, (function(e, n) {
                    if (e)
                        if (404 === e.statusCode && 'NoSuchWebsiteConfiguration' === e.error.Code) {
                            var r = {
                                WebsiteConfiguration: {},
                                statusCode: e.statusCode
                            };
                            e.headers && (r.headers = e.headers),
                            t(null, r);
                        } else
                            t(e);
                    else {
                        var i = n.WebsiteConfiguration || {};
                        if (i.RoutingRules) {
                            var a = o.clone(i.RoutingRules.RoutingRule || []);
                            a = o.makeArray(a),
                            i.RoutingRules = a;
                        }
                        t(null, {
                            WebsiteConfiguration: i,
                            statusCode: n.statusCode,
                            headers: n.headers
                        });
                    }
                }
                ));
            },
            deleteBucketWebsite: function(e, t) {
                l.call(this, {
                    Action: 'name/cos:DeleteBucketWebsite',
                    method: 'DELETE',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'website'
                }, (function(e, n) {
                    return e && 204 === e.statusCode ? t(null, {
                        statusCode: e.statusCode
                    }) : e ? t(e) : void t(null, {
                        statusCode: n.statusCode,
                        headers: n.headers
                    });
                }
                ));
            },
            getObject: function(e, t) {
                var n = {};
                n['response-content-type'] = e.ResponseContentType,
                n['response-content-language'] = e.ResponseContentLanguage,
                n['response-expires'] = e.ResponseExpires,
                n['response-cache-control'] = e.ResponseCacheControl,
                n['response-content-disposition'] = e.ResponseContentDisposition,
                n['response-content-encoding'] = e.ResponseContentEncoding,
                l.call(this, {
                    Action: 'name/cos:GetObject',
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    VersionId: e.VersionId,
                    headers: e.Headers,
                    qs: n,
                    rawBody: !0
                }, (function(n, r) {
                    if (n) {
                        var i = n.statusCode;
                        return e.Headers['If-Modified-Since'] && i && 304 === i ? t(null, {
                            NotModified: !0
                        }) : t(n);
                    }
                    var a = {};
                    a.Body = r.body,
                    r.headers && r.headers.etag && (a.ETag = r.headers && r.headers.etag),
                    o.extend(a, {
                        statusCode: r.statusCode,
                        headers: r.headers
                    }),
                    t(null, a);
                }
                ));
            },
            headObject: function(e, t) {
                l.call(this, {
                    Action: 'name/cos:HeadObject',
                    method: 'HEAD',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    VersionId: e.VersionId,
                    headers: e.Headers
                }, (function(n, r) {
                    if (n) {
                        var o = n.statusCode;
                        return e.Headers['If-Modified-Since'] && o && 304 === o ? t(null, {
                            NotModified: !0,
                            statusCode: o
                        }) : t(n);
                    }
                    r.headers && r.headers.etag && (r.ETag = r.headers && r.headers.etag),
                    t(null, r);
                }
                ));
            },
            listObjectVersions: function(e, t) {
                var n = {};
                n.prefix = e.Prefix || '',
                n.delimiter = e.Delimiter,
                n['key-marker'] = e.KeyMarker,
                n['version-id-marker'] = e.VersionIdMarker,
                n['max-keys'] = e.MaxKeys,
                n['encoding-type'] = e.EncodingType,
                l.call(this, {
                    Action: 'name/cos:GetBucketObjectVersions',
                    ResourceKey: n.prefix,
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    qs: n,
                    action: 'versions'
                }, (function(e, n) {
                    if (e)
                        return t(e);
                    var r = n.ListVersionsResult || {}
                        , i = r.DeleteMarker || [];
                    i = o.isArray(i) ? i : [i];
                    var a = r.Version || [];
                    a = o.isArray(a) ? a : [a];
                    var s = o.clone(r);
                    delete s.DeleteMarker,
                    delete s.Version,
                    o.extend(s, {
                        DeleteMarkers: i,
                        Versions: a,
                        statusCode: n.statusCode,
                        headers: n.headers
                    }),
                    t(null, s);
                }
                ));
            },
            putObject: function(e, t) {
                var n = this
                    , r = e.ContentLength
                    , i = o.throttleOnProgress.call(n, r, e.onProgress)
                    , a = e.Headers;
                !a['Cache-Control'] && (a['Cache-Control'] = '');
                var c = a['Content-Type'] || e.Body && e.Body.type;
                !a['Content-Type'] && c && (a['Content-Type'] = c);
                var u = e.UploadAddMetaMd5 || n.options.UploadAddMetaMd5 || n.options.UploadCheckContentMd5;
                o.getBodyMd5(u, e.Body, (function(a) {
                    a && (n.options.UploadCheckContentMd5 && (e.Headers['Content-MD5'] = o.binaryBase64(a)),
                    (e.UploadAddMetaMd5 || n.options.UploadAddMetaMd5) && (e.Headers['x-cos-meta-md5'] = a)),
                    void 0 !== e.ContentLength && (e.Headers['Content-Length'] = e.ContentLength),
                    i(null, !0),
                    l.call(n, {
                        Action: 'name/cos:PutObject',
                        TaskId: e.TaskId,
                        method: 'PUT',
                        Bucket: e.Bucket,
                        Region: e.Region,
                        Key: e.Key,
                        headers: e.Headers,
                        body: e.Body,
                        onProgress: i
                    }, (function(o, a) {
                        if (o)
                            return i(null, !0),
                            t(o);
                        if (i({
                            loaded: r,
                            total: r
                        }, !0),
                        a) {
                            var c = s({
                                    ForcePathStyle: n.options.ForcePathStyle,
                                    protocol: n.options.Protocol,
                                    domain: n.options.Domain,
                                    bucket: e.Bucket,
                                    region: e.Region,
                                    object: e.Key
                                })
                                , u = {
                                    Location: c = c.substr(c.indexOf('://') + 3),
                                    statusCode: a.statusCode,
                                    headers: a.headers
                                };
                            return a.headers && a.headers.etag && (u.ETag = a.headers.etag),
                            t(null, u);
                        }
                        t(null, a);
                    }
                    ));
                }
                ), e.onHashProgress);
            },
            deleteObject: function(e, t) {
                l.call(this, {
                    Action: 'name/cos:DeleteObject',
                    method: 'DELETE',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    headers: e.Headers,
                    VersionId: e.VersionId
                }, (function(e, n) {
                    if (e) {
                        var r = e.statusCode;
                        return r && 204 === r ? t(null, {
                            statusCode: r
                        }) : r && 404 === r ? t(null, {
                            BucketNotFound: !0,
                            statusCode: r
                        }) : t(e);
                    }
                    t(null, {
                        statusCode: n.statusCode,
                        headers: n.headers
                    });
                }
                ));
            },
            getObjectAcl: function(e, t) {
                l.call(this, {
                    Action: 'name/cos:GetObjectACL',
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    headers: e.Headers,
                    action: 'acl'
                }, (function(e, n) {
                    if (e)
                        return t(e);
                    var r = n.AccessControlPolicy || {}
                        , a = r.Owner || {}
                        , s = r.AccessControlList && r.AccessControlList.Grant || [];
                    s = o.isArray(s) ? s : [s];
                    var c = i(r);
                    n.headers && n.headers['x-cos-acl'] && (c.ACL = n.headers['x-cos-acl']),
                    c = o.extend(c, {
                        Owner: a,
                        Grants: s,
                        statusCode: n.statusCode,
                        headers: n.headers
                    }),
                    t(null, c);
                }
                ));
            },
            putObjectAcl: function(e, t) {
                var n = e.Headers
                    , r = '';
                if (e.AccessControlPolicy) {
                    var i = o.clone(e.AccessControlPolicy || {})
                        , s = i.Grants || i.Grant;
                    s = o.isArray(s) ? s : [s],
                    delete i.Grant,
                    delete i.Grants,
                    i.AccessControlList = {
                        Grant: s
                    },
                    r = o.json2xml({
                        AccessControlPolicy: i
                    }),
                    n['Content-Type'] = 'application/xml',
                    n['Content-MD5'] = o.binaryBase64(o.md5(r));
                }
                o.each(n, (function(e, t) {
                    0 === t.indexOf('x-cos-grant-') && (n[t] = a(n[t]));
                }
                )),
                l.call(this, {
                    Action: 'name/cos:PutObjectACL',
                    method: 'PUT',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    action: 'acl',
                    headers: n,
                    body: r
                }, (function(e, n) {
                    if (e)
                        return t(e);
                    t(null, {
                        statusCode: n.statusCode,
                        headers: n.headers
                    });
                }
                ));
            },
            optionsObject: function(e, t) {
                var n = e.Headers;
                n.Origin = e.Origin,
                n['Access-Control-Request-Method'] = e.AccessControlRequestMethod,
                n['Access-Control-Request-Headers'] = e.AccessControlRequestHeaders,
                l.call(this, {
                    Action: 'name/cos:OptionsObject',
                    method: 'OPTIONS',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    headers: n
                }, (function(e, n) {
                    if (e)
                        return e.statusCode && 403 === e.statusCode ? t(null, {
                            OptionsForbidden: !0,
                            statusCode: e.statusCode
                        }) : t(e);
                    var r = n.headers || {};
                    t(null, {
                        AccessControlAllowOrigin: r['access-control-allow-origin'],
                        AccessControlAllowMethods: r['access-control-allow-methods'],
                        AccessControlAllowHeaders: r['access-control-allow-headers'],
                        AccessControlExposeHeaders: r['access-control-expose-headers'],
                        AccessControlMaxAge: r['access-control-max-age'],
                        statusCode: n.statusCode,
                        headers: n.headers
                    });
                }
                ));
            },
            putObjectCopy: function(e, t) {
                var n = e.Headers;
                !n['Cache-Control'] && (n['Cache-Control'] = '');
                var r = (e.CopySource || '').match(/^([^.]+-\d+)\.cos(v6)?\.([^.]+)\.[^/]+\/(.+)$/);
                if (r) {
                    var i = r[1]
                        , a = r[3]
                        , s = decodeURIComponent(r[4]);
                    l.call(this, {
                        Scope: [{
                            action: 'name/cos:GetObject',
                            bucket: i,
                            region: a,
                            prefix: s
                        }, {
                            action: 'name/cos:PutObject',
                            bucket: e.Bucket,
                            region: e.Region,
                            prefix: e.Key
                        }],
                        method: 'PUT',
                        Bucket: e.Bucket,
                        Region: e.Region,
                        Key: e.Key,
                        VersionId: e.VersionId,
                        headers: e.Headers
                    }, (function(e, n) {
                        if (e)
                            return t(e);
                        var r = o.clone(n.CopyObjectResult || {});
                        o.extend(r, {
                            statusCode: n.statusCode,
                            headers: n.headers
                        }),
                        t(null, r);
                    }
                    ));
                } else
                    t({
                        error: 'CopySource format error'
                    });
            },
            deleteMultipleObject: function(e, t) {
                var n = e.Objects || []
                    , r = e.Quiet;
                n = o.isArray(n) ? n : [n];
                var i = o.json2xml({
                        Delete: {
                            Object: n,
                            Quiet: r || !1
                        }
                    })
                    , a = e.Headers;
                a['Content-Type'] = 'application/xml',
                a['Content-MD5'] = o.binaryBase64(o.md5(i));
                var s = o.map(n, (function(t) {
                    return {
                        action: 'name/cos:DeleteObject',
                        bucket: e.Bucket,
                        region: e.Region,
                        prefix: t.Key
                    };
                }
                ));
                l.call(this, {
                    Scope: s,
                    method: 'POST',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    body: i,
                    action: 'delete',
                    headers: a
                }, (function(e, n) {
                    if (e)
                        return t(e);
                    var r = n.DeleteResult || {}
                        , i = r.Deleted || []
                        , a = r.Error || [];
                    i = o.isArray(i) ? i : [i],
                    a = o.isArray(a) ? a : [a];
                    var s = o.clone(r);
                    o.extend(s, {
                        Error: a,
                        Deleted: i,
                        statusCode: n.statusCode,
                        headers: n.headers
                    }),
                    t(null, s);
                }
                ));
            },
            restoreObject: function(e, t) {
                var n = e.Headers;
                if (e.RestoreRequest) {
                    var r = e.RestoreRequest || {}
                        , i = o.json2xml({
                            RestoreRequest: r
                        });
                    n['Content-Type'] = 'application/xml',
                    n['Content-MD5'] = o.binaryBase64(o.md5(i)),
                    l.call(this, {
                        Action: 'name/cos:RestoreObject',
                        method: 'POST',
                        Bucket: e.Bucket,
                        Region: e.Region,
                        Key: e.Key,
                        VersionId: e.VersionId,
                        body: i,
                        action: 'restore',
                        headers: n
                    }, (function(e, n) {
                        t(e, n);
                    }
                    ));
                } else
                    t({
                        error: 'missing param RestoreRequest'
                    });
            },
            uploadPartCopy: function(e, t) {
                var n = (e.CopySource || '').match(/^([^.]+-\d+)\.cos(v6)?\.([^.]+)\.[^/]+\/(.+)$/);
                if (n) {
                    var r = n[1]
                        , i = n[3]
                        , a = decodeURIComponent(n[4]);
                    l.call(this, {
                        Scope: [{
                            action: 'name/cos:GetObject',
                            bucket: r,
                            region: i,
                            prefix: a
                        }, {
                            action: 'name/cos:PutObject',
                            bucket: e.Bucket,
                            region: e.Region,
                            prefix: e.Key
                        }],
                        method: 'PUT',
                        Bucket: e.Bucket,
                        Region: e.Region,
                        Key: e.Key,
                        VersionId: e.VersionId,
                        qs: {
                            partNumber: e.PartNumber,
                            uploadId: e.UploadId
                        },
                        headers: e.Headers
                    }, (function(e, n) {
                        if (e)
                            return t(e);
                        var r = o.clone(n.CopyPartResult || {});
                        o.extend(r, {
                            statusCode: n.statusCode,
                            headers: n.headers
                        }),
                        t(null, r);
                    }
                    ));
                } else
                    t({
                        error: 'CopySource format error'
                    });
            },
            multipartInit: function(e, t) {
                var n = this
                    , r = e.Headers;
                !r['Cache-Control'] && (r['Cache-Control'] = ''),
                o.getBodyMd5(e.Body && (e.UploadAddMetaMd5 || n.options.UploadAddMetaMd5), e.Body, (function(r) {
                    r && (e.Headers['x-cos-meta-md5'] = r),
                    l.call(n, {
                        Action: 'name/cos:InitiateMultipartUpload',
                        method: 'POST',
                        Bucket: e.Bucket,
                        Region: e.Region,
                        Key: e.Key,
                        action: 'uploads',
                        headers: e.Headers
                    }, (function(e, n) {
                        return e ? t(e) : (n = o.clone(n || {})) && n.InitiateMultipartUploadResult ? t(null, o.extend(n.InitiateMultipartUploadResult, {
                            statusCode: n.statusCode,
                            headers: n.headers
                        })) : void t(null, n);
                    }
                    ));
                }
                ), e.onHashProgress);
            },
            multipartUpload: function(e, t) {
                var n = this;
                o.getFileSize('multipartUpload', e, (function() {
                    o.getBodyMd5(n.options.UploadCheckContentMd5, e.Body, (function(r) {
                        r && (e.Headers['Content-MD5'] = o.binaryBase64(r)),
                        l.call(n, {
                            Action: 'name/cos:UploadPart',
                            TaskId: e.TaskId,
                            method: 'PUT',
                            Bucket: e.Bucket,
                            Region: e.Region,
                            Key: e.Key,
                            qs: {
                                partNumber: e.PartNumber,
                                uploadId: e.UploadId
                            },
                            headers: e.Headers,
                            onProgress: e.onProgress,
                            body: e.Body || null
                        }, (function(e, n) {
                            if (e)
                                return t(e);
                            n.headers = n.headers || {},
                            t(null, {
                                ETag: n.headers.etag || '',
                                statusCode: n.statusCode,
                                headers: n.headers
                            });
                        }
                        ));
                    }
                    ));
                }
                ));
            },
            multipartComplete: function(e, t) {
                for (var n = this, r = e.UploadId, i = e.Parts, a = 0, c = i.length; a < c; a++)
                    0 !== i[a].ETag.indexOf('"') && (i[a].ETag = '"' + i[a].ETag + '"');
                var u = o.json2xml({
                        CompleteMultipartUpload: {
                            Part: i
                        }
                    })
                    , d = e.Headers;
                d['Content-Type'] = 'application/xml',
                d['Content-MD5'] = o.binaryBase64(o.md5(u)),
                l.call(this, {
                    Action: 'name/cos:CompleteMultipartUpload',
                    method: 'POST',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    qs: {
                        uploadId: r
                    },
                    body: u,
                    headers: d
                }, (function(r, i) {
                    if (r)
                        return t(r);
                    var a = s({
                            ForcePathStyle: n.options.ForcePathStyle,
                            protocol: n.options.Protocol,
                            domain: n.options.Domain,
                            bucket: e.Bucket,
                            region: e.Region,
                            object: e.Key,
                            isLocation: !0
                        })
                        , c = i.CompleteMultipartUploadResult || {}
                        , u = o.extend(c, {
                            Location: a,
                            statusCode: i.statusCode,
                            headers: i.headers
                        });
                    t(null, u);
                }
                ));
            },
            multipartList: function(e, t) {
                var n = {};
                n.delimiter = e.Delimiter,
                n['encoding-type'] = e.EncodingType,
                n.prefix = e.Prefix || '',
                n['max-uploads'] = e.MaxUploads,
                n['key-marker'] = e.KeyMarker,
                n['upload-id-marker'] = e.UploadIdMarker,
                n = o.clearKey(n),
                l.call(this, {
                    Action: 'name/cos:ListMultipartUploads',
                    ResourceKey: n.prefix,
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    qs: n,
                    action: 'uploads'
                }, (function(e, n) {
                    if (e)
                        return t(e);
                    if (n && n.ListMultipartUploadsResult) {
                        var r = n.ListMultipartUploadsResult.Upload || []
                            , i = n.ListMultipartUploadsResult.CommonPrefixes || [];
                        i = o.isArray(i) ? i : [i],
                        r = o.isArray(r) ? r : [r],
                        n.ListMultipartUploadsResult.Upload = r,
                        n.ListMultipartUploadsResult.CommonPrefixes = i;
                    }
                    var a = o.clone(n.ListMultipartUploadsResult || {});
                    o.extend(a, {
                        statusCode: n.statusCode,
                        headers: n.headers
                    }),
                    t(null, a);
                }
                ));
            },
            multipartListPart: function(e, t) {
                var n = {};
                n.uploadId = e.UploadId,
                n['encoding-type'] = e.EncodingType,
                n['max-parts'] = e.MaxParts,
                n['part-number-marker'] = e.PartNumberMarker,
                l.call(this, {
                    Action: 'name/cos:ListParts',
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    headers: e.Headers,
                    qs: n
                }, (function(e, n) {
                    if (e)
                        return t(e);
                    var r = n.ListPartsResult || {}
                        , i = r.Part || [];
                    i = o.isArray(i) ? i : [i],
                    r.Part = i;
                    var a = o.clone(r);
                    o.extend(a, {
                        statusCode: n.statusCode,
                        headers: n.headers
                    }),
                    t(null, a);
                }
                ));
            },
            multipartAbort: function(e, t) {
                var n = {};
                n.uploadId = e.UploadId,
                l.call(this, {
                    Action: 'name/cos:AbortMultipartUpload',
                    method: 'DELETE',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    headers: e.Headers,
                    qs: n
                }, (function(e, n) {
                    if (e)
                        return t(e);
                    t(null, {
                        statusCode: n.statusCode,
                        headers: n.headers
                    });
                }
                ));
            },
            getObjectUrl: function(e, t) {
                var n = s({
                    ForcePathStyle: this.options.ForcePathStyle,
                    protocol: e.Protocol || this.options.Protocol,
                    domain: this.options.Domain,
                    bucket: e.Bucket,
                    region: e.Region,
                    object: e.Key
                });
                if (void 0 !== e.Sign && !e.Sign)
                    return t(null, {
                        Url: n
                    }),
                    n;
                var r = c.call(this, {
                    Action: 'PUT' === (e.Method || '').toUpperCase() ? 'name/cos:PutObject' : 'name/cos:GetObject',
                    Bucket: e.Bucket || '',
                    Region: e.Region || '',
                    Method: e.Method || 'get',
                    Key: e.Key,
                    Expires: e.Expires
                }, (function(e, r) {
                    if (t)
                        if (e)
                            t(e);
                        else {
                            var o = n;
                            o += '?' + (r.Authorization.indexOf('q-signature') > -1 ? r.Authorization : 'sign=' + encodeURIComponent(r.Authorization)),
                            r.XCosSecurityToken && (o += '&x-cos-security-token=' + r.XCosSecurityToken),
                            r.ClientIP && (o += '&clientIP=' + r.ClientIP),
                            r.ClientUA && (o += '&clientUA=' + r.ClientUA),
                            r.Token && (o += '&token=' + r.Token),
                            setTimeout((function() {
                                t(null, {
                                    Url: o
                                });
                            }
                            ));
                        }
                }
                ));
                return r ? n + '?' + r.Authorization + (r.XCosSecurityToken ? '&x-cos-security-token=' + r.XCosSecurityToken : '') : n;
            },
            getAuth: function(e) {
                return o.getAuth({
                    SecretId: e.SecretId || this.options.SecretId || '',
                    SecretKey: e.SecretKey || this.options.SecretKey || '',
                    Method: e.Method,
                    Key: e.Key,
                    Query: e.Query,
                    Headers: e.Headers,
                    Expires: e.Expires,
                    UseRawKey: this.options.UseRawKey,
                    SystemClockOffset: this.options.SystemClockOffset
                });
            }
        };
        e.exports.init = function(e, t) {
            t.transferToTaskMethod(p, 'putObject'),
            o.each(p, (function(t, n) {
                e.prototype[n] = o.apiWrapper(n, t),
                function(e, t, n) {
                    o.each(['Cors', 'Acl'], (function(r) {
                        if (e.slice(-r.length) === r) {
                            var i = e.slice(0, -r.length) + r.toUpperCase()
                                , a = o.apiWrapper(e, t)
                                , s = !1;
                            n[i] = function() {
                                !s && console.warn('warning: cos.' + i + ' has been deprecated. Please Use cos.' + e + ' instead.'),
                                s = !0,
                                a.apply(this, arguments);
                            };
                        }
                    }
                    ));
                }(n, t, e.prototype);
            }
            ));
        };
    }
    , function(e, t) {
        var n = function() {
                var e = []
                    , t = e.slice
                    , n = e.concat
                    , r = e.push
                    , o = e.indexOf
                    , i = {}
                    , a = i.toString
                    , s = i.hasOwnProperty
                    , c = {}
                    , u = '1.11.1 -css,-css/addGetHookIf,-css/curCSS,-css/defaultDisplay,-css/hiddenVisibleSelectors,-css/support,-css/swap,-css/var/cssExpand,-css/var/isHidden,-css/var/rmargin,-css/var/rnumnonpx,-effects,-effects/Tween,-effects/animatedSelector,-effects/support,-dimensions,-offset,-deprecated,-event-alias,-wrap'
                    , l = function(e, t) {
                        return new l.fn.init(e,t);
                    }
                    , d = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
                    , p = /^-ms-/
                    , f = /-([\da-z])/gi
                    , h = function(e, t) {
                        return t.toUpperCase();
                    };
                function m(e) {
                    var t = e.length
                        , n = l.type(e);
                    return 'function' !== n && !l.isWindow(e) && (!(1 !== e.nodeType || !t) || ('array' === n || 0 === t || 'number' == typeof t && t > 0 && t - 1 in e));
                }
                l.fn = l.prototype = {
                    jquery: u,
                    constructor: l,
                    selector: '',
                    length: 0,
                    toArray: function() {
                        return t.call(this);
                    },
                    get: function(e) {
                        return null != e ? e < 0 ? this[e + this.length] : this[e] : t.call(this);
                    },
                    pushStack: function(e) {
                        var t = l.merge(this.constructor(), e);
                        return t.prevObject = this,
                        t.context = this.context,
                        t;
                    },
                    each: function(e, t) {
                        return l.each(this, e, t);
                    },
                    map: function(e) {
                        return this.pushStack(l.map(this, (function(t, n) {
                            return e.call(t, n, t);
                        }
                        )));
                    },
                    slice: function() {
                        return this.pushStack(t.apply(this, arguments));
                    },
                    first: function() {
                        return this.eq(0);
                    },
                    last: function() {
                        return this.eq(-1);
                    },
                    eq: function(e) {
                        var t = this.length
                            , n = +e + (e < 0 ? t : 0);
                        return this.pushStack(n >= 0 && n < t ? [this[n]] : []);
                    },
                    end: function() {
                        return this.prevObject || this.constructor(null);
                    },
                    push: r,
                    sort: e.sort,
                    splice: e.splice
                },
                l.extend = l.fn.extend = function() {
                    var e, t, n, r, o, i, a = arguments[0] || {}, s = 1, c = arguments.length, u = !1;
                    for ('boolean' == typeof a && (u = a,
                    a = arguments[s] || {},
                    s++),
                    'object' == typeof a || l.isFunction(a) || (a = {}),
                    s === c && (a = this,
                    s--); s < c; s++)
                        if (null != (o = arguments[s]))
                            for (r in o)
                                e = a[r],
                                a !== (n = o[r]) && (u && n && (l.isPlainObject(n) || (t = l.isArray(n))) ? (t ? (t = !1,
                                i = e && l.isArray(e) ? e : []) : i = e && l.isPlainObject(e) ? e : {},
                                a[r] = l.extend(u, i, n)) : void 0 !== n && (a[r] = n));
                    return a;
                }
                ,
                l.extend({
                    expando: 'jQuery' + (u + Math.random()).replace(/\D/g, ''),
                    isReady: !0,
                    error: function(e) {
                        throw new Error(e);
                    },
                    noop: function() {},
                    isFunction: function(e) {
                        return 'function' === l.type(e);
                    },
                    isArray: Array.isArray || function(e) {
                        return 'array' === l.type(e);
                    }
                    ,
                    isWindow: function(e) {
                        return null != e && e == e.window;
                    },
                    isNumeric: function(e) {
                        return !l.isArray(e) && e - parseFloat(e) >= 0;
                    },
                    isEmptyObject: function(e) {
                        var t;
                        for (t in e)
                            return !1;
                        return !0;
                    },
                    isPlainObject: function(e) {
                        var t;
                        if (!e || 'object' !== l.type(e) || e.nodeType || l.isWindow(e))
                            return !1;
                        try {
                            if (e.constructor && !s.call(e, 'constructor') && !s.call(e.constructor.prototype, 'isPrototypeOf'))
                                return !1;
                        } catch (e) {
                            return !1;
                        }
                        if (c.ownLast)
                            for (t in e)
                                return s.call(e, t);
                        for (t in e)
                            ;
                        return void 0 === t || s.call(e, t);
                    },
                    type: function(e) {
                        return null == e ? e + '' : 'object' == typeof e || 'function' == typeof e ? i[a.call(e)] || 'object' : typeof e;
                    },
                    globalEval: function(e) {
                        e && l.trim(e) && (window.execScript || function(e) {
                            window.eval.call(window, e);
                        }
                        )(e);
                    },
                    camelCase: function(e) {
                        return e.replace(p, 'ms-').replace(f, h);
                    },
                    nodeName: function(e, t) {
                        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
                    },
                    each: function(e, t, n) {
                        var r = 0
                            , o = e.length
                            , i = m(e);
                        if (n) {
                            if (i)
                                for (; r < o && !1 !== t.apply(e[r], n); r++)
                                    ;
                            else
                                for (r in e)
                                    if (!1 === t.apply(e[r], n))
                                        break;
                        } else if (i)
                            for (; r < o && !1 !== t.call(e[r], r, e[r]); r++)
                                ;
                        else
                            for (r in e)
                                if (!1 === t.call(e[r], r, e[r]))
                                    break;
                        return e;
                    },
                    trim: function(e) {
                        return null == e ? '' : (e + '').replace(d, '');
                    },
                    makeArray: function(e, t) {
                        var n = t || [];
                        return null != e && (m(Object(e)) ? l.merge(n, 'string' == typeof e ? [e] : e) : r.call(n, e)),
                        n;
                    },
                    inArray: function(e, t, n) {
                        var r;
                        if (t) {
                            if (o)
                                return o.call(t, e, n);
                            for (r = t.length,
                            n = n ? n < 0 ? Math.max(0, r + n) : n : 0; n < r; n++)
                                if (n in t && t[n] === e)
                                    return n;
                        }
                        return -1;
                    },
                    merge: function(e, t) {
                        for (var n = +t.length, r = 0, o = e.length; r < n; )
                            e[o++] = t[r++];
                        if (n != n)
                            for (; void 0 !== t[r]; )
                                e[o++] = t[r++];
                        return e.length = o,
                        e;
                    },
                    grep: function(e, t, n) {
                        for (var r = [], o = 0, i = e.length, a = !n; o < i; o++)
                            !t(e[o], o) !== a && r.push(e[o]);
                        return r;
                    },
                    map: function(e, t, r) {
                        var o, i = 0, a = e.length, s = [];
                        if (m(e))
                            for (; i < a; i++)
                                null != (o = t(e[i], i, r)) && s.push(o);
                        else
                            for (i in e)
                                null != (o = t(e[i], i, r)) && s.push(o);
                        return n.apply([], s);
                    },
                    guid: 1,
                    proxy: function(e, n) {
                        var r, o, i;
                        if ('string' == typeof n && (i = e[n],
                        n = e,
                        e = i),
                        l.isFunction(e))
                            return r = t.call(arguments, 2),
                            (o = function() {
                                return e.apply(n || this, r.concat(t.call(arguments)));
                            }
                            ).guid = e.guid = e.guid || l.guid++,
                            o;
                    },
                    now: function() {
                        return +new Date;
                    },
                    support: c
                }),
                l.each('Boolean Number String Function Array Date RegExp Object Error'.split(' '), (function(e, t) {
                    i['[object ' + t + ']'] = t.toLowerCase();
                }
                ));
                var g, y = window.document, v = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
                (l.fn.init = function(e, t) {
                    var n, r;
                    if (!e)
                        return this;
                    if ('string' == typeof e) {
                        if (!(n = '<' === e.charAt(0) && '>' === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : v.exec(e)) || !n[1] && t)
                            return !t || t.jquery ? (t || g).find(e) : this.constructor(t).find(e);
                        if (n[1]) {
                            if (t = t instanceof l ? t[0] : t,
                            l.merge(this, l.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : y, !0)),
                            rsingleTag.test(n[1]) && l.isPlainObject(t))
                                for (n in t)
                                    l.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                            return this;
                        }
                        if ((r = y.getElementById(n[2])) && r.parentNode) {
                            if (r.id !== n[2])
                                return g.find(e);
                            this.length = 1,
                            this[0] = r;
                        }
                        return this.context = y,
                        this.selector = e,
                        this;
                    }
                    return e.nodeType ? (this.context = this[0] = e,
                    this.length = 1,
                    this) : l.isFunction(e) ? void 0 !== g.ready ? g.ready(e) : e(l) : (void 0 !== e.selector && (this.selector = e.selector,
                    this.context = e.context),
                    l.makeArray(e, this));
                }
                ).prototype = l.fn,
                g = l(y);
                var C, b = /\S+/g, S = {};
                function x() {
                    y.addEventListener ? (y.removeEventListener('DOMContentLoaded', w, !1),
                    window.removeEventListener('load', w, !1)) : (y.detachEvent('onreadystatechange', w),
                    window.detachEvent('onload', w));
                }
                function w() {
                    (y.addEventListener || 'load' === event.type || 'complete' === y.readyState) && (x(),
                    l.ready());
                }
                l.Callbacks = function(e) {
                    e = 'string' == typeof e ? S[e] || function(e) {
                        var t = S[e] = {};
                        return l.each(e.match(b) || [], (function(e, n) {
                            t[n] = !0;
                        }
                        )),
                        t;
                    }(e) : l.extend({}, e);
                    var t, n, r, o, i, a, s = [], c = !e.once && [], u = function(l) {
                            for (n = e.memory && l,
                            r = !0,
                            i = a || 0,
                            a = 0,
                            o = s.length,
                            t = !0; s && i < o; i++)
                                if (!1 === s[i].apply(l[0], l[1]) && e.stopOnFalse) {
                                    n = !1;
                                    break;
                                }
                            t = !1,
                            s && (c ? c.length && u(c.shift()) : n ? s = [] : d.disable());
                        }, d = {
                            add: function() {
                                if (s) {
                                    var r = s.length;
                                    !function t(n) {
                                        l.each(n, (function(n, r) {
                                            var o = l.type(r);
                                            'function' === o ? e.unique && d.has(r) || s.push(r) : r && r.length && 'string' !== o && t(r);
                                        }
                                        ));
                                    }(arguments),
                                    t ? o = s.length : n && (a = r,
                                    u(n));
                                }
                                return this;
                            },
                            remove: function() {
                                return s && l.each(arguments, (function(e, n) {
                                    for (var r; (r = l.inArray(n, s, r)) > -1; )
                                        s.splice(r, 1),
                                        t && (r <= o && o--,
                                        r <= i && i--);
                                }
                                )),
                                this;
                            },
                            has: function(e) {
                                return e ? l.inArray(e, s) > -1 : !(!s || !s.length);
                            },
                            empty: function() {
                                return s = [],
                                o = 0,
                                this;
                            },
                            disable: function() {
                                return s = c = n = void 0,
                                this;
                            },
                            disabled: function() {
                                return !s;
                            },
                            lock: function() {
                                return c = void 0,
                                n || d.disable(),
                                this;
                            },
                            locked: function() {
                                return !c;
                            },
                            fireWith: function(e, n) {
                                return !s || r && !c || (n = [e, (n = n || []).slice ? n.slice() : n],
                                t ? c.push(n) : u(n)),
                                this;
                            },
                            fire: function() {
                                return d.fireWith(this, arguments),
                                this;
                            },
                            fired: function() {
                                return !!r;
                            }
                        };
                    return d;
                }
                ,
                l.extend({
                    Deferred: function(e) {
                        var t = [['resolve', 'done', l.Callbacks('once memory'), 'resolved'], ['reject', 'fail', l.Callbacks('once memory'), 'rejected'], ['notify', 'progress', l.Callbacks('memory')]]
                            , n = 'pending'
                            , r = {
                                state: function() {
                                    return n;
                                },
                                always: function() {
                                    return o.done(arguments).fail(arguments),
                                    this;
                                },
                                then: function() {
                                    var e = arguments;
                                    return l.Deferred((function(n) {
                                        l.each(t, (function(t, i) {
                                            var a = l.isFunction(e[t]) && e[t];
                                            o[i[1]]((function() {
                                                var e = a && a.apply(this, arguments);
                                                e && l.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[i[0] + 'With'](this === r ? n.promise() : this, a ? [e] : arguments);
                                            }
                                            ));
                                        }
                                        )),
                                        e = null;
                                    }
                                    )).promise();
                                },
                                promise: function(e) {
                                    return null != e ? l.extend(e, r) : r;
                                }
                            }
                            , o = {};
                        return r.pipe = r.then,
                        l.each(t, (function(e, i) {
                            var a = i[2]
                                , s = i[3];
                            r[i[1]] = a.add,
                            s && a.add((function() {
                                n = s;
                            }
                            ), t[1 ^ e][2].disable, t[2][2].lock),
                            o[i[0]] = function() {
                                return o[i[0] + 'With'](this === o ? r : this, arguments),
                                this;
                            }
                            ,
                            o[i[0] + 'With'] = a.fireWith;
                        }
                        )),
                        r.promise(o),
                        e && e.call(o, o),
                        o;
                    },
                    when: function(e) {
                        var n, r, o, i = 0, a = t.call(arguments), s = a.length, c = 1 !== s || e && l.isFunction(e.promise) ? s : 0, u = 1 === c ? e : l.Deferred(), d = function(e, r, o) {
                            return function(i) {
                                r[e] = this,
                                o[e] = arguments.length > 1 ? t.call(arguments) : i,
                                o === n ? u.notifyWith(r, o) : --c || u.resolveWith(r, o);
                            };
                        };
                        if (s > 1)
                            for (n = new Array(s),
                            r = new Array(s),
                            o = new Array(s); i < s; i++)
                                a[i] && l.isFunction(a[i].promise) ? a[i].promise().done(d(i, o, a)).fail(u.reject).progress(d(i, r, n)) : --c;
                        return c || u.resolveWith(o, a),
                        u.promise();
                    }
                }),
                l.fn.ready = function(e) {
                    return l.ready.promise().done(e),
                    this;
                }
                ,
                l.extend({
                    isReady: !1,
                    readyWait: 1,
                    holdReady: function(e) {
                        e ? l.readyWait++ : l.ready(!0);
                    },
                    ready: function(e) {
                        if (!(!0 === e ? --l.readyWait : l.isReady)) {
                            if (!y.body)
                                return setTimeout(l.ready);
                            l.isReady = !0,
                            !0 !== e && --l.readyWait > 0 || (C.resolveWith(y, [l]),
                            l.fn.triggerHandler && (l(y).triggerHandler('ready'),
                            l(y).off('ready')));
                        }
                    }
                }),
                l.ready.promise = function(e) {
                    if (!C)
                        if (C = l.Deferred(),
                        'complete' === y.readyState)
                            setTimeout(l.ready);
                        else if (y.addEventListener)
                            y.addEventListener('DOMContentLoaded', w, !1),
                            window.addEventListener('load', w, !1);
                        else {
                            y.attachEvent('onreadystatechange', w),
                            window.attachEvent('onload', w);
                            var t = !1;
                            try {
                                t = null == window.frameElement && y.documentElement;
                            } catch (e) {}
                            t && t.doScroll && function e() {
                                if (!l.isReady) {
                                    try {
                                        t.doScroll('left');
                                    } catch (t) {
                                        return setTimeout(e, 50);
                                    }
                                    x(),
                                    l.ready();
                                }
                            }();
                        }
                    return C.promise(e);
                }
                ;
                var k;
                for (k in l(c))
                    break;
                c.ownLast = '0' !== k,
                c.inlineBlockNeedsLayout = !1,
                l((function() {
                    var e, t, n, r;
                    (n = y.getElementsByTagName('body')[0]) && n.style && (t = y.createElement('div'),
                    (r = y.createElement('div')).style.cssText = 'position:absolute;border:0;width:0;height:0;top:0;left:-9999px',
                    n.appendChild(r).appendChild(t),
                    void 0 !== t.style.zoom && (t.style.cssText = 'display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1',
                    c.inlineBlockNeedsLayout = e = 3 === t.offsetWidth,
                    e && (n.style.zoom = 1)),
                    n.removeChild(r));
                }
                )),
                function() {
                    var e = y.createElement('div');
                    if (null == c.deleteExpando) {
                        c.deleteExpando = !0;
                        try {
                            delete e.test;
                        } catch (e) {
                            c.deleteExpando = !1;
                        }
                    }
                    e = null;
                }(),
                l.acceptData = function(e) {
                    var t = l.noData[(e.nodeName + ' ').toLowerCase()]
                        , n = +e.nodeType || 1;
                    return (1 === n || 9 === n) && (!t || !0 !== t && e.getAttribute('classid') === t);
                }
                ;
                var T = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
                    , R = /([A-Z])/g;
                function _(e, t, n) {
                    if (void 0 === n && 1 === e.nodeType) {
                        var r = 'data-' + t.replace(R, '-$1').toLowerCase();
                        if ('string' == typeof (n = e.getAttribute(r))) {
                            try {
                                n = 'true' === n || 'false' !== n && ('null' === n ? null : +n + '' === n ? +n : T.test(n) ? l.parseJSON(n) : n);
                            } catch (e) {}
                            l.data(e, t, n);
                        } else
                            n = void 0;
                    }
                    return n;
                }
                function E(e) {
                    var t;
                    for (t in e)
                        if (('data' !== t || !l.isEmptyObject(e[t])) && 'toJSON' !== t)
                            return !1;
                    return !0;
                }
                function A(t, n, r, o) {
                    if (l.acceptData(t)) {
                        var i, a, s = l.expando, c = t.nodeType, u = c ? l.cache : t, d = c ? t[s] : t[s] && s;
                        if (d && u[d] && (o || u[d].data) || void 0 !== r || 'string' != typeof n)
                            return d || (d = c ? t[s] = e.pop() || l.guid++ : s),
                            u[d] || (u[d] = c ? {} : {
                                toJSON: l.noop
                            }),
                            'object' != typeof n && 'function' != typeof n || (o ? u[d] = l.extend(u[d], n) : u[d].data = l.extend(u[d].data, n)),
                            a = u[d],
                            o || (a.data || (a.data = {}),
                            a = a.data),
                            void 0 !== r && (a[l.camelCase(n)] = r),
                            'string' == typeof n ? null == (i = a[n]) && (i = a[l.camelCase(n)]) : i = a,
                            i;
                    }
                }
                function N(e, t, n) {
                    if (l.acceptData(e)) {
                        var r, o, i = e.nodeType, a = i ? l.cache : e, s = i ? e[l.expando] : l.expando;
                        if (a[s]) {
                            if (t && (r = n ? a[s] : a[s].data)) {
                                o = (t = l.isArray(t) ? t.concat(l.map(t, l.camelCase)) : t in r || (t = l.camelCase(t))in r ? [t] : t.split(' ')).length;
                                for (; o--; )
                                    delete r[t[o]];
                                if (n ? !E(r) : !l.isEmptyObject(r))
                                    return;
                            }
                            (n || (delete a[s].data,
                            E(a[s]))) && (i ? l.cleanData([e], !0) : c.deleteExpando || a != a.window ? delete a[s] : a[s] = null);
                        }
                    }
                }
                l.extend({
                    cache: {},
                    noData: {
                        'applet ': !0,
                        'embed ': !0,
                        'object ': 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'
                    },
                    hasData: function(e) {
                        return !!(e = e.nodeType ? l.cache[e[l.expando]] : e[l.expando]) && !E(e);
                    },
                    data: function(e, t, n) {
                        return A(e, t, n);
                    },
                    removeData: function(e, t) {
                        return N(e, t);
                    },
                    _data: function(e, t, n) {
                        return A(e, t, n, !0);
                    },
                    _removeData: function(e, t) {
                        return N(e, t, !0);
                    }
                }),
                l.fn.extend({
                    data: function(e, t) {
                        var n, r, o, i = this[0], a = i && i.attributes;
                        if (void 0 === e) {
                            if (this.length && (o = l.data(i),
                            1 === i.nodeType && !l._data(i, 'parsedAttrs'))) {
                                for (n = a.length; n--; )
                                    a[n] && 0 === (r = a[n].name).indexOf('data-') && _(i, r = l.camelCase(r.slice(5)), o[r]);
                                l._data(i, 'parsedAttrs', !0);
                            }
                            return o;
                        }
                        return 'object' == typeof e ? this.each((function() {
                            l.data(this, e);
                        }
                        )) : arguments.length > 1 ? this.each((function() {
                            l.data(this, e, t);
                        }
                        )) : i ? _(i, e, l.data(i, e)) : void 0;
                    },
                    removeData: function(e) {
                        return this.each((function() {
                            l.removeData(this, e);
                        }
                        ));
                    }
                }),
                l.extend({
                    queue: function(e, t, n) {
                        var r;
                        if (e)
                            return t = (t || 'fx') + 'queue',
                            r = l._data(e, t),
                            n && (!r || l.isArray(n) ? r = l._data(e, t, l.makeArray(n)) : r.push(n)),
                            r || [];
                    },
                    dequeue: function(e, t) {
                        t = t || 'fx';
                        var n = l.queue(e, t)
                            , r = n.length
                            , o = n.shift()
                            , i = l._queueHooks(e, t);
                        'inprogress' === o && (o = n.shift(),
                        r--),
                        o && ('fx' === t && n.unshift('inprogress'),
                        delete i.stop,
                        o.call(e, (function() {
                            l.dequeue(e, t);
                        }
                        ), i)),
                        !r && i && i.empty.fire();
                    },
                    _queueHooks: function(e, t) {
                        var n = t + 'queueHooks';
                        return l._data(e, n) || l._data(e, n, {
                            empty: l.Callbacks('once memory').add((function() {
                                l._removeData(e, t + 'queue'),
                                l._removeData(e, n);
                            }
                            ))
                        });
                    }
                }),
                l.fn.extend({
                    queue: function(e, t) {
                        var n = 2;
                        return 'string' != typeof e && (t = e,
                        e = 'fx',
                        n--),
                        arguments.length < n ? l.queue(this[0], e) : void 0 === t ? this : this.each((function() {
                            var n = l.queue(this, e, t);
                            l._queueHooks(this, e),
                            'fx' === e && 'inprogress' !== n[0] && l.dequeue(this, e);
                        }
                        ));
                    },
                    dequeue: function(e) {
                        return this.each((function() {
                            l.dequeue(this, e);
                        }
                        ));
                    },
                    clearQueue: function(e) {
                        return this.queue(e || 'fx', []);
                    },
                    promise: function(e, t) {
                        var n, r = 1, o = l.Deferred(), i = this, a = this.length, s = function() {
                            --r || o.resolveWith(i, [i]);
                        };
                        for ('string' != typeof e && (t = e,
                        e = void 0),
                        e = e || 'fx'; a--; )
                            (n = l._data(i[a], e + 'queueHooks')) && n.empty && (r++,
                            n.empty.add(s));
                        return s(),
                        o.promise(t);
                    }
                }),
                l.event = {
                    global: {},
                    add: function(e, t, n, r, o) {
                        var i, a, s, c, u, d, p, f, h, m, g, y = l._data(e);
                        if (y) {
                            for (n.handler && (n = (c = n).handler,
                            o = c.selector),
                            n.guid || (n.guid = l.guid++),
                            (a = y.events) || (a = y.events = {}),
                            (d = y.handle) || ((d = y.handle = function(e) {
                                return void 0 === l || e && l.event.triggered === e.type ? void 0 : l.event.dispatch.apply(d.elem, arguments);
                            }
                            ).elem = e),
                            s = (t = (t || '').match(b) || ['']).length; s--; )
                                h = g = (i = O.exec(t[s]) || [])[1],
                                m = (i[2] || '').split('.').sort(),
                                h && (u = l.event.special[h] || {},
                                h = (o ? u.delegateType : u.bindType) || h,
                                u = l.event.special[h] || {},
                                p = l.extend({
                                    type: h,
                                    origType: g,
                                    data: r,
                                    handler: n,
                                    guid: n.guid,
                                    selector: o,
                                    needsContext: o && l.expr.match.needsContext.test(o),
                                    namespace: m.join('.')
                                }, c),
                                (f = a[h]) || ((f = a[h] = []).delegateCount = 0,
                                u.setup && !1 !== u.setup.call(e, r, m, d) || (e.addEventListener ? e.addEventListener(h, d, !1) : e.attachEvent && e.attachEvent('on' + h, d))),
                                u.add && (u.add.call(e, p),
                                p.handler.guid || (p.handler.guid = n.guid)),
                                o ? f.splice(f.delegateCount++, 0, p) : f.push(p),
                                l.event.global[h] = !0);
                            e = null;
                        }
                    },
                    remove: function(e, t, n, r, o) {
                        var i, a, s, c, u, d, p, f, h, m, g, y = l.hasData(e) && l._data(e);
                        if (y && (d = y.events)) {
                            for (u = (t = (t || '').match(b) || ['']).length; u--; )
                                if (h = g = (s = O.exec(t[u]) || [])[1],
                                m = (s[2] || '').split('.').sort(),
                                h) {
                                    for (p = l.event.special[h] || {},
                                    f = d[h = (r ? p.delegateType : p.bindType) || h] || [],
                                    s = s[2] && new RegExp('(^|\\.)' + m.join('\\.(?:.*\\.|)') + '(\\.|$)'),
                                    c = i = f.length; i--; )
                                        a = f[i],
                                        !o && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ('**' !== r || !a.selector) || (f.splice(i, 1),
                                        a.selector && f.delegateCount--,
                                        p.remove && p.remove.call(e, a));
                                    c && !f.length && (p.teardown && !1 !== p.teardown.call(e, m, y.handle) || l.removeEvent(e, h, y.handle),
                                    delete d[h]);
                                } else
                                    for (h in d)
                                        l.event.remove(e, h + t[u], n, r, !0);
                            l.isEmptyObject(d) && (delete y.handle,
                            l._removeData(e, 'events'));
                        }
                    },
                    trigger: function(e, t, n, r) {
                        var o, i, a, c, u, d, p, f = [n || y], h = s.call(e, 'type') ? e.type : e, m = s.call(e, 'namespace') ? e.namespace.split('.') : [];
                        if (a = d = n = n || y,
                        3 !== n.nodeType && 8 !== n.nodeType && !D.test(h + l.event.triggered) && (h.indexOf('.') >= 0 && (m = h.split('.'),
                        h = m.shift(),
                        m.sort()),
                        i = h.indexOf(':') < 0 && 'on' + h,
                        (e = e[l.expando] ? e : new l.Event(h,'object' == typeof e && e)).isTrigger = r ? 2 : 3,
                        e.namespace = m.join('.'),
                        e.namespace_re = e.namespace ? new RegExp('(^|\\.)' + m.join('\\.(?:.*\\.|)') + '(\\.|$)') : null,
                        e.result = void 0,
                        e.target || (e.target = n),
                        t = null == t ? [e] : l.makeArray(t, [e]),
                        u = l.event.special[h] || {},
                        r || !u.trigger || !1 !== u.trigger.apply(n, t))) {
                            if (!r && !u.noBubble && !l.isWindow(n)) {
                                for (c = u.delegateType || h,
                                D.test(c + h) || (a = a.parentNode); a; a = a.parentNode)
                                    f.push(a),
                                    d = a;
                                d === (n.ownerDocument || y) && f.push(d.defaultView || d.parentWindow || window);
                            }
                            for (p = 0; (a = f[p++]) && !e.isPropagationStopped(); )
                                e.type = p > 1 ? c : u.bindType || h,
                                (o = (l._data(a, 'events') || {})[e.type] && l._data(a, 'handle')) && o.apply(a, t),
                                (o = i && a[i]) && o.apply && l.acceptData(a) && (e.result = o.apply(a, t),
                                !1 === e.result && e.preventDefault());
                            if (e.type = h,
                            !r && !e.isDefaultPrevented() && (!u._default || !1 === u._default.apply(f.pop(), t)) && l.acceptData(n) && i && n[h] && !l.isWindow(n)) {
                                (d = n[i]) && (n[i] = null),
                                l.event.triggered = h;
                                try {
                                    n[h]();
                                } catch (e) {}
                                l.event.triggered = void 0,
                                d && (n[i] = d);
                            }
                            return e.result;
                        }
                    },
                    dispatch: function(e) {
                        e = l.event.fix(e);
                        var n, r, o, i, a, s = [], c = t.call(arguments), u = (l._data(this, 'events') || {})[e.type] || [], d = l.event.special[e.type] || {};
                        if (c[0] = e,
                        e.delegateTarget = this,
                        !d.preDispatch || !1 !== d.preDispatch.call(this, e)) {
                            for (s = l.event.handlers.call(this, e, u),
                            n = 0; (i = s[n++]) && !e.isPropagationStopped(); )
                                for (e.currentTarget = i.elem,
                                a = 0; (o = i.handlers[a++]) && !e.isImmediatePropagationStopped(); )
                                    e.namespace_re && !e.namespace_re.test(o.namespace) || (e.handleObj = o,
                                    e.data = o.data,
                                    void 0 !== (r = ((l.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, c)) && !1 === (e.result = r) && (e.preventDefault(),
                                    e.stopPropagation()));
                            return d.postDispatch && d.postDispatch.call(this, e),
                            e.result;
                        }
                    },
                    handlers: function(e, t) {
                        var n, r, o, i, a = [], s = t.delegateCount, c = e.target;
                        if (s && c.nodeType && (!e.button || 'click' !== e.type))
                            for (; c != this; c = c.parentNode || this)
                                if (1 === c.nodeType && (!0 !== c.disabled || 'click' !== e.type)) {
                                    for (o = [],
                                    i = 0; i < s; i++)
                                        void 0 === o[n = (r = t[i]).selector + ' '] && (o[n] = r.needsContext ? l(n, this).index(c) >= 0 : l.find(n, this, null, [c]).length),
                                        o[n] && o.push(r);
                                    o.length && a.push({
                                        elem: c,
                                        handlers: o
                                    });
                                }
                        return s < t.length && a.push({
                            elem: this,
                            handlers: t.slice(s)
                        }),
                        a;
                    },
                    fix: function(e) {
                        if (e[l.expando])
                            return e;
                        var t, n, r, o = e.type, i = e, a = this.fixHooks[o];
                        for (a || (this.fixHooks[o] = a = P.test(o) ? this.mouseHooks : I.test(o) ? this.keyHooks : {}),
                        r = a.props ? this.props.concat(a.props) : this.props,
                        e = new l.Event(i),
                        t = r.length; t--; )
                            e[n = r[t]] = i[n];
                        return e.target || (e.target = i.srcElement || y),
                        3 === e.target.nodeType && (e.target = e.target.parentNode),
                        e.metaKey = !!e.metaKey,
                        a.filter ? a.filter(e, i) : e;
                    },
                    props: 'altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(' '),
                    fixHooks: {},
                    keyHooks: {
                        props: 'char charCode key keyCode'.split(' '),
                        filter: function(e, t) {
                            return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode),
                            e;
                        }
                    },
                    mouseHooks: {
                        props: 'button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement'.split(' '),
                        filter: function(e, t) {
                            var n, r, o, i = t.button, a = t.fromElement;
                            return null == e.pageX && null != t.clientX && (o = (r = e.target.ownerDocument || y).documentElement,
                            n = r.body,
                            e.pageX = t.clientX + (o && o.scrollLeft || n && n.scrollLeft || 0) - (o && o.clientLeft || n && n.clientLeft || 0),
                            e.pageY = t.clientY + (o && o.scrollTop || n && n.scrollTop || 0) - (o && o.clientTop || n && n.clientTop || 0)),
                            !e.relatedTarget && a && (e.relatedTarget = a === e.target ? t.toElement : a),
                            e.which || void 0 === i || (e.which = 1 & i ? 1 : 2 & i ? 3 : 4 & i ? 2 : 0),
                            e;
                        }
                    },
                    special: {
                        load: {
                            noBubble: !0
                        },
                        focus: {
                            trigger: function() {
                                if (this !== safeActiveElement() && this.focus)
                                    try {
                                        return this.focus(),
                                        !1;
                                    } catch (e) {}
                            },
                            delegateType: 'focusin'
                        },
                        blur: {
                            trigger: function() {
                                if (this === safeActiveElement() && this.blur)
                                    return this.blur(),
                                    !1;
                            },
                            delegateType: 'focusout'
                        },
                        click: {
                            trigger: function() {
                                if (l.nodeName(this, 'input') && 'checkbox' === this.type && this.click)
                                    return this.click(),
                                    !1;
                            },
                            _default: function(e) {
                                return l.nodeName(e.target, 'a');
                            }
                        },
                        beforeunload: {
                            postDispatch: function(e) {
                                void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
                            }
                        }
                    },
                    simulate: function(e, t, n, r) {
                        var o = l.extend(new l.Event, n, {
                            type: e,
                            isSimulated: !0,
                            originalEvent: {}
                        });
                        r ? l.event.trigger(o, null, t) : l.event.dispatch.call(t, o),
                        o.isDefaultPrevented() && n.preventDefault();
                    }
                },
                l.removeEvent = y.removeEventListener ? function(e, t, n) {
                    e.removeEventListener && e.removeEventListener(t, n, !1);
                }
                    : function(e, t, n) {
                        var r = 'on' + t;
                        e.detachEvent && (void 0 === e[r] && (e[r] = null),
                        e.detachEvent(r, n));
                    }
                ,
                l.Event = function(e, t) {
                    if (!(this instanceof l.Event))
                        return new l.Event(e,t);
                    e && e.type ? (this.originalEvent = e,
                    this.type = e.type,
                    this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? L : j) : this.type = e,
                    t && l.extend(this, t),
                    this.timeStamp = e && e.timeStamp || l.now(),
                    this[l.expando] = !0;
                }
                ;
                var B = /^(?:input|select|textarea)$/i
                    , I = /^key/
                    , P = /^(?:mouse|pointer|contextmenu)|click/
                    , D = /^(?:focusinfocus|focusoutblur)$/
                    , O = /^([^.]*)(?:\.(.+)|)$/;
                function L() {
                    return !0;
                }
                function j() {
                    return !1;
                }
                l.Event.prototype = {
                    isDefaultPrevented: j,
                    isPropagationStopped: j,
                    isImmediatePropagationStopped: j,
                    preventDefault: function() {
                        var e = this.originalEvent;
                        this.isDefaultPrevented = L,
                        e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
                    },
                    stopPropagation: function() {
                        var e = this.originalEvent;
                        this.isPropagationStopped = L,
                        e && (e.stopPropagation && e.stopPropagation(),
                        e.cancelBubble = !0);
                    },
                    stopImmediatePropagation: function() {
                        var e = this.originalEvent;
                        this.isImmediatePropagationStopped = L,
                        e && e.stopImmediatePropagation && e.stopImmediatePropagation(),
                        this.stopPropagation();
                    }
                },
                c.submitBubbles || (l.event.special.submit = {
                    setup: function() {
                        if (l.nodeName(this, 'form'))
                            return !1;
                        l.event.add(this, 'click._submit keypress._submit', (function(e) {
                            var t = e.target
                                , n = l.nodeName(t, 'input') || l.nodeName(t, 'button') ? t.form : void 0;
                            n && !l._data(n, 'submitBubbles') && (l.event.add(n, 'submit._submit', (function(e) {
                                e._submit_bubble = !0;
                            }
                            )),
                            l._data(n, 'submitBubbles', !0));
                        }
                        ));
                    },
                    postDispatch: function(e) {
                        e._submit_bubble && (delete e._submit_bubble,
                        this.parentNode && !e.isTrigger && l.event.simulate('submit', this.parentNode, e, !0));
                    },
                    teardown: function() {
                        if (l.nodeName(this, 'form'))
                            return !1;
                        l.event.remove(this, '._submit');
                    }
                }),
                c.changeBubbles || (l.event.special.change = {
                    setup: function() {
                        if (B.test(this.nodeName))
                            return 'checkbox' !== this.type && 'radio' !== this.type || (l.event.add(this, 'propertychange._change', (function(e) {
                                'checked' === e.originalEvent.propertyName && (this._just_changed = !0);
                            }
                            )),
                            l.event.add(this, 'click._change', (function(e) {
                                this._just_changed && !e.isTrigger && (this._just_changed = !1),
                                l.event.simulate('change', this, e, !0);
                            }
                            ))),
                            !1;
                        l.event.add(this, 'beforeactivate._change', (function(e) {
                            var t = e.target;
                            B.test(t.nodeName) && !l._data(t, 'changeBubbles') && (l.event.add(t, 'change._change', (function(e) {
                                !this.parentNode || e.isSimulated || e.isTrigger || l.event.simulate('change', this.parentNode, e, !0);
                            }
                            )),
                            l._data(t, 'changeBubbles', !0));
                        }
                        ));
                    },
                    handle: function(e) {
                        var t = e.target;
                        if (this !== t || e.isSimulated || e.isTrigger || 'radio' !== t.type && 'checkbox' !== t.type)
                            return e.handleObj.handler.apply(this, arguments);
                    },
                    teardown: function() {
                        return l.event.remove(this, '._change'),
                        !B.test(this.nodeName);
                    }
                }),
                c.focusinBubbles || l.each({
                    focus: 'focusin',
                    blur: 'focusout'
                }, (function(e, t) {
                    var n = function(e) {
                        l.event.simulate(t, e.target, l.event.fix(e), !0);
                    };
                    l.event.special[t] = {
                        setup: function() {
                            var r = this.ownerDocument || this
                                , o = l._data(r, t);
                            o || r.addEventListener(e, n, !0),
                            l._data(r, t, (o || 0) + 1);
                        },
                        teardown: function() {
                            var r = this.ownerDocument || this
                                , o = l._data(r, t) - 1;
                            o ? l._data(r, t, o) : (r.removeEventListener(e, n, !0),
                            l._removeData(r, t));
                        }
                    };
                }
                )),
                l.fn.extend({
                    on: function(e, t, n, r, o) {
                        var i, a;
                        if ('object' == typeof e) {
                            for (i in 'string' != typeof t && (n = n || t,
                            t = void 0),
                            e)
                                this.on(i, t, n, e[i], o);
                            return this;
                        }
                        if (null == n && null == r ? (r = t,
                        n = t = void 0) : null == r && ('string' == typeof t ? (r = n,
                        n = void 0) : (r = n,
                        n = t,
                        t = void 0)),
                        !1 === r)
                            r = j;
                        else if (!r)
                            return this;
                        return 1 === o && (a = r,
                        (r = function(e) {
                            return l().off(e),
                            a.apply(this, arguments);
                        }
                        ).guid = a.guid || (a.guid = l.guid++)),
                        this.each((function() {
                            l.event.add(this, e, r, n, t);
                        }
                        ));
                    },
                    one: function(e, t, n, r) {
                        return this.on(e, t, n, r, 1);
                    },
                    off: function(e, t, n) {
                        var r, o;
                        if (e && e.preventDefault && e.handleObj)
                            return r = e.handleObj,
                            l(e.delegateTarget).off(r.namespace ? r.origType + '.' + r.namespace : r.origType, r.selector, r.handler),
                            this;
                        if ('object' == typeof e) {
                            for (o in e)
                                this.off(o, t, e[o]);
                            return this;
                        }
                        return !1 !== t && 'function' != typeof t || (n = t,
                        t = void 0),
                        !1 === n && (n = j),
                        this.each((function() {
                            l.event.remove(this, e, n, t);
                        }
                        ));
                    },
                    trigger: function(e, t) {
                        return this.each((function() {
                            l.event.trigger(e, t, this);
                        }
                        ));
                    },
                    triggerHandler: function(e, t) {
                        var n = this[0];
                        if (n)
                            return l.event.trigger(e, t, n, !0);
                    }
                }),
                l.fn.delay = function(e, t) {
                    return e = l.fx && l.fx.speeds[e] || e,
                    t = t || 'fx',
                    this.queue(t, (function(t, n) {
                        var r = setTimeout(t, e);
                        n.stop = function() {
                            clearTimeout(r);
                        };
                    }
                    ));
                }
                ;
                var U = l.now()
                    , M = /\?/
                    , H = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
                l.parseJSON = function(e) {
                    if (window.JSON && window.JSON.parse)
                        return window.JSON.parse(e + '');
                    var t, n = null, r = l.trim(e + '');
                    return r && !l.trim(r.replace(H, (function(e, r, o, i) {
                        return t && r && (n = 0),
                        0 === n ? e : (t = o || r,
                        n += !i - !o,
                        '');
                    }
                    ))) ? Function('return ' + r)() : l.error('Invalid JSON: ' + e);
                }
                ,
                l.parseXML = function(e) {
                    var t;
                    if (!e || 'string' != typeof e)
                        return null;
                    try {
                        window.DOMParser ? t = (new DOMParser).parseFromString(e, 'text/xml') : ((t = new ActiveXObject('Microsoft.XMLDOM')).async = 'false',
                        t.loadXML(e));
                    } catch (e) {
                        t = void 0;
                    }
                    return t && t.documentElement && !t.getElementsByTagName('parsererror').length || l.error('Invalid XML: ' + e),
                    t;
                }
                ;
                var F, K, q = /#.*$/, z = /([?&])_=[^&]*/, X = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, G = /^(?:GET|HEAD)$/, V = /^\/\//, W = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, $ = {}, J = {}, Q = '*/'.concat('*');
                try {
                    K = location.href;
                } catch (e) {
                    (K = y.createElement('a')).href = '',
                    K = K.href;
                }
                function Y(e) {
                    return function(t, n) {
                        'string' != typeof t && (n = t,
                        t = '*');
                        var r, o = 0, i = t.toLowerCase().match(b) || [];
                        if (l.isFunction(n))
                            for (; r = i[o++]; )
                                '+' === r.charAt(0) ? (r = r.slice(1) || '*',
                                (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n);
                    };
                }
                function Z(e, t, n, r) {
                    var o = {}
                        , i = e === J;
                    function a(s) {
                        var c;
                        return o[s] = !0,
                        l.each(e[s] || [], (function(e, s) {
                            var u = s(t, n, r);
                            return 'string' != typeof u || i || o[u] ? i ? !(c = u) : void 0 : (t.dataTypes.unshift(u),
                            a(u),
                            !1);
                        }
                        )),
                        c;
                    }
                    return a(t.dataTypes[0]) || !o['*'] && a('*');
                }
                function ee(e, t) {
                    var n, r, o = l.ajaxSettings.flatOptions || {};
                    for (r in t)
                        void 0 !== t[r] && ((o[r] ? e : n || (n = {}))[r] = t[r]);
                    return n && l.extend(!0, e, n),
                    e;
                }
                F = W.exec(K.toLowerCase()) || [],
                l.extend({
                    active: 0,
                    lastModified: {},
                    etag: {},
                    ajaxSettings: {
                        url: K,
                        type: 'GET',
                        isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(F[1]),
                        global: !0,
                        processData: !0,
                        async: !0,
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        accepts: {
                            '*': Q,
                            text: 'text/plain',
                            html: 'text/html',
                            xml: 'application/xml, text/xml',
                            json: 'application/json, text/javascript'
                        },
                        contents: {
                            xml: /xml/,
                            html: /html/,
                            json: /json/
                        },
                        responseFields: {
                            xml: 'responseXML',
                            text: 'responseText',
                            json: 'responseJSON'
                        },
                        converters: {
                            '* text': String,
                            'text html': !0,
                            'text json': l.parseJSON,
                            'text xml': l.parseXML
                        },
                        flatOptions: {
                            url: !0,
                            context: !0
                        }
                    },
                    ajaxSetup: function(e, t) {
                        return t ? ee(ee(e, l.ajaxSettings), t) : ee(l.ajaxSettings, e);
                    },
                    ajaxPrefilter: Y($),
                    ajaxTransport: Y(J),
                    ajax: function(e, t) {
                        'object' == typeof e && (t = e,
                        e = void 0),
                        t = t || {};
                        var n, r, o, i, a, s, c, u, d = l.ajaxSetup({}, t), p = d.context || d, f = d.context && (p.nodeType || p.jquery) ? l(p) : l.event, h = l.Deferred(), m = l.Callbacks('once memory'), g = d.statusCode || {}, y = {}, v = {}, C = 0, S = 'canceled', x = {
                            readyState: 0,
                            getResponseHeader: function(e) {
                                var t;
                                if (2 === C) {
                                    if (!u)
                                        for (u = {}; t = X.exec(i); )
                                            u[t[1].toLowerCase()] = t[2];
                                    t = u[e.toLowerCase()];
                                }
                                return null == t ? null : t;
                            },
                            getAllResponseHeaders: function() {
                                return 2 === C ? i : null;
                            },
                            setRequestHeader: function(e, t) {
                                var n = e.toLowerCase();
                                return C || (e = v[n] = v[n] || e,
                                y[e] = t),
                                this;
                            },
                            overrideMimeType: function(e) {
                                return C || (d.mimeType = e),
                                this;
                            },
                            statusCode: function(e) {
                                var t;
                                if (e)
                                    if (C < 2)
                                        for (t in e)
                                            g[t] = [g[t], e[t]];
                                    else
                                        x.always(e[x.status]);
                                return this;
                            },
                            abort: function(e) {
                                var t = e || S;
                                return c && c.abort(t),
                                w(0, t),
                                this;
                            }
                        };
                        if (h.promise(x).complete = m.add,
                        x.success = x.done,
                        x.error = x.fail,
                        d.url = ((e || d.url || K) + '').replace(q, '').replace(V, F[1] + '//'),
                        d.type = t.method || t.type || d.method || d.type,
                        d.dataTypes = l.trim(d.dataType || '*').toLowerCase().match(b) || [''],
                        null == d.crossDomain && (n = W.exec(d.url.toLowerCase()),
                        d.crossDomain = !(!n || n[1] === F[1] && n[2] === F[2] && (n[3] || ('http:' === n[1] ? '80' : '443')) === (F[3] || ('http:' === F[1] ? '80' : '443')))),
                        d.data && d.processData && 'string' != typeof d.data && (d.data = l.param(d.data, d.traditional)),
                        Z($, d, t, x),
                        2 === C)
                            return x;
                        for (r in (s = d.global) && 0 == l.active++ && l.event.trigger('ajaxStart'),
                        d.type = d.type.toUpperCase(),
                        d.hasContent = !G.test(d.type),
                        o = d.url,
                        d.hasContent || (d.data && (o = d.url += (M.test(o) ? '&' : '?') + d.data,
                        delete d.data),
                        !1 === d.cache && (d.url = z.test(o) ? o.replace(z, '$1_=' + U++) : o + (M.test(o) ? '&' : '?') + '_=' + U++)),
                        d.ifModified && (l.lastModified[o] && x.setRequestHeader('If-Modified-Since', l.lastModified[o]),
                        l.etag[o] && x.setRequestHeader('If-None-Match', l.etag[o])),
                        (d.data && d.hasContent && !1 !== d.contentType || t.contentType) && x.setRequestHeader('Content-Type', d.contentType),
                        d.headers)
                            x.setRequestHeader(r, d.headers[r]);
                        if (d.beforeSend && (!1 === d.beforeSend.call(p, x, d) || 2 === C))
                            return x.abort();
                        for (r in S = 'abort',
                        {
                            success: 1,
                            error: 1,
                            complete: 1
                        })
                            x[r](d[r]);
                        if (c = Z(J, d, t, x)) {
                            x.readyState = 1,
                            s && f.trigger('ajaxSend', [x, d]),
                            d.async && d.timeout > 0 && (a = setTimeout((function() {
                                x.abort('timeout');
                            }
                            ), d.timeout));
                            try {
                                C = 1,
                                c.send(y, w);
                            } catch (e) {
                                if (!(C < 2))
                                    throw e;
                                w(-1, e);
                            }
                        } else
                            w(-1, 'No Transport');
                        function w(e, t, n, r) {
                            var u, y, v, b, S, w = t;
                            2 !== C && (C = 2,
                            a && clearTimeout(a),
                            c = void 0,
                            i = r || '',
                            x.readyState = e > 0 ? 4 : 0,
                            u = e >= 200 && e < 300 || 304 === e,
                            n && (b = function(e, t, n) {
                                for (var r, o, i, a, s = e.contents, c = e.dataTypes; '*' === c[0]; )
                                    c.shift(),
                                    void 0 === o && (o = e.mimeType || t.getResponseHeader('Content-Type'));
                                if (o)
                                    for (a in s)
                                        if (s[a] && s[a].test(o)) {
                                            c.unshift(a);
                                            break;
                                        }
                                if (c[0]in n)
                                    i = c[0];
                                else {
                                    for (a in n) {
                                        if (!c[0] || e.converters[a + ' ' + c[0]]) {
                                            i = a;
                                            break;
                                        }
                                        r || (r = a);
                                    }
                                    i = i || r;
                                }
                                if (i)
                                    return i !== c[0] && c.unshift(i),
                                    n[i];
                            }(d, x, n)),
                            b = function(e, t, n, r) {
                                var o, i, a, s, c, u = {}, l = e.dataTypes.slice();
                                if (l[1])
                                    for (a in e.converters)
                                        u[a.toLowerCase()] = e.converters[a];
                                for (i = l.shift(); i; )
                                    if (e.responseFields[i] && (n[e.responseFields[i]] = t),
                                    !c && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                                    c = i,
                                    i = l.shift())
                                        if ('*' === i)
                                            i = c;
                                        else if ('*' !== c && c !== i) {
                                            if (!(a = u[c + ' ' + i] || u['* ' + i]))
                                                for (o in u)
                                                    if ((s = o.split(' '))[1] === i && (a = u[c + ' ' + s[0]] || u['* ' + s[0]])) {
                                                        !0 === a ? a = u[o] : !0 !== u[o] && (i = s[0],
                                                        l.unshift(s[1]));
                                                        break;
                                                    }
                                            if (!0 !== a)
                                                if (a && e.throws)
                                                    t = a(t);
                                                else
                                                    try {
                                                        t = a(t);
                                                    } catch (e) {
                                                        return {
                                                            state: 'parsererror',
                                                            error: a ? e : 'No conversion from ' + c + ' to ' + i
                                                        };
                                                    }
                                        }
                                return {
                                    state: 'success',
                                    data: t
                                };
                            }(d, b, x, u),
                            u ? (d.ifModified && ((S = x.getResponseHeader('Last-Modified')) && (l.lastModified[o] = S),
                            (S = x.getResponseHeader('etag')) && (l.etag[o] = S)),
                            204 === e || 'HEAD' === d.type ? w = 'nocontent' : 304 === e ? w = 'notmodified' : (w = b.state,
                            y = b.data,
                            u = !(v = b.error))) : (v = w,
                            !e && w || (w = 'error',
                            e < 0 && (e = 0))),
                            x.status = e,
                            x.statusText = (t || w) + '',
                            u ? h.resolveWith(p, [y, w, x]) : h.rejectWith(p, [x, w, v]),
                            x.statusCode(g),
                            g = void 0,
                            s && f.trigger(u ? 'ajaxSuccess' : 'ajaxError', [x, d, u ? y : v]),
                            m.fireWith(p, [x, w]),
                            s && (f.trigger('ajaxComplete', [x, d]),
                            --l.active || l.event.trigger('ajaxStop')));
                        }
                        return x;
                    },
                    getJSON: function(e, t, n) {
                        return l.get(e, t, n, 'json');
                    },
                    getScript: function(e, t) {
                        return l.get(e, void 0, t, 'script');
                    }
                }),
                l.each(['get', 'post'], (function(e, t) {
                    l[t] = function(e, n, r, o) {
                        return l.isFunction(n) && (o = o || r,
                        r = n,
                        n = void 0),
                        l.ajax({
                            url: e,
                            type: t,
                            dataType: o,
                            data: n,
                            success: r
                        });
                    };
                }
                )),
                l.each(['ajaxStart', 'ajaxStop', 'ajaxComplete', 'ajaxError', 'ajaxSuccess', 'ajaxSend'], (function(e, t) {
                    l.fn[t] = function(e) {
                        return this.on(t, e);
                    };
                }
                )),
                l._evalUrl = function(e) {
                    return l.ajax({
                        url: e,
                        type: 'GET',
                        dataType: 'script',
                        async: !1,
                        global: !1,
                        throws: !0
                    });
                }
                ;
                var te = /%20/g
                    , ne = /\[\]$/
                    , re = /\r?\n/g
                    , oe = /^(?:submit|button|image|reset|file)$/i
                    , ie = /^(?:input|select|textarea|keygen)/i;
                function ae(e, t, n, r) {
                    var o;
                    if (l.isArray(t))
                        l.each(t, (function(t, o) {
                            n || ne.test(e) ? r(e, o) : ae(e + '[' + ('object' == typeof o ? t : '') + ']', o, n, r);
                        }
                        ));
                    else if (n || 'object' !== l.type(t))
                        r(e, t);
                    else
                        for (o in t)
                            ae(e + '[' + o + ']', t[o], n, r);
                }
                l.param = function(e, t) {
                    var n, r = [], o = function(e, t) {
                        t = l.isFunction(t) ? t() : null == t ? '' : t,
                        r[r.length] = encodeURIComponent(e) + '=' + encodeURIComponent(t);
                    };
                    if (void 0 === t && (t = l.ajaxSettings && l.ajaxSettings.traditional),
                    l.isArray(e) || e.jquery && !l.isPlainObject(e))
                        l.each(e, (function() {
                            o(this.name, this.value);
                        }
                        ));
                    else
                        for (n in e)
                            ae(n, e[n], t, o);
                    return r.join('&').replace(te, '+');
                }
                ,
                l.fn.extend({
                    serialize: function() {
                        return l.param(this.serializeArray());
                    },
                    serializeArray: function() {
                        return this.map((function() {
                            var e = l.prop(this, 'elements');
                            return e ? l.makeArray(e) : this;
                        }
                        )).filter((function() {
                            var e = this.type;
                            return this.name && !l(this).is(':disabled') && ie.test(this.nodeName) && !oe.test(e) && (this.checked || !rcheckableType.test(e));
                        }
                        )).map((function(e, t) {
                            var n = l(this).val();
                            return null == n ? null : l.isArray(n) ? l.map(n, (function(e) {
                                return {
                                    name: t.name,
                                    value: e.replace(re, '\r\n')
                                };
                            }
                            )) : {
                                name: t.name,
                                value: n.replace(re, '\r\n')
                            };
                        }
                        )).get();
                    }
                }),
                l.ajaxSettings.xhr = void 0 !== window.ActiveXObject ? function() {
                    return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && le() || function() {
                        try {
                            return new window.ActiveXObject('Microsoft.XMLHTTP');
                        } catch (e) {}
                    }();
                }
                    : le;
                var se = 0
                    , ce = {}
                    , ue = l.ajaxSettings.xhr();
                function le() {
                    try {
                        return new window.XMLHttpRequest;
                    } catch (e) {}
                }
                window.ActiveXObject && l(window).on('unload', (function() {
                    for (var e in ce)
                        ce[e](void 0, !0);
                }
                )),
                c.cors = !!ue && 'withCredentials'in ue,
                (ue = c.ajax = !!ue) && l.ajaxTransport((function(e) {
                    var t;
                    if (!e.crossDomain || c.cors)
                        return {
                            send: function(n, r) {
                                var o, i = e.xhr(), a = ++se;
                                if (i.open(e.type, e.url, e.async, e.username, e.password),
                                e.xhrFields)
                                    for (o in e.xhrFields)
                                        i[o] = e.xhrFields[o];
                                for (o in e.mimeType && i.overrideMimeType && i.overrideMimeType(e.mimeType),
                                e.crossDomain || n['X-Requested-With'] || (n['X-Requested-With'] = 'XMLHttpRequest'),
                                n)
                                    void 0 !== n[o] && i.setRequestHeader(o, n[o] + '');
                                i.upload && e.progress && (i.upload.onprogress = e.progress),
                                i.send(e.hasContent && (e.body || e.data) || null),
                                t = function(n, o) {
                                    var s, c, u;
                                    if (t && (o || 4 === i.readyState))
                                        if (delete ce[a],
                                        t = void 0,
                                        i.onreadystatechange = l.noop,
                                        o)
                                            4 !== i.readyState && i.abort();
                                        else {
                                            u = {},
                                            s = i.status,
                                            'string' == typeof i.responseText && (u.text = i.responseText);
                                            try {
                                                c = i.statusText;
                                            } catch (e) {
                                                c = '';
                                            }
                                            s || !e.isLocal || e.crossDomain ? 1223 === s && (s = 204) : s = u.text ? 200 : 404;
                                        }
                                    u && r(s, c, u, i.getAllResponseHeaders());
                                }
                                ,
                                e.async ? 4 === i.readyState ? setTimeout(t) : i.onreadystatechange = ce[a] = t : t();
                            },
                            abort: function() {
                                t && t(void 0, !0);
                            }
                        };
                }
                )),
                l.ajaxSetup({
                    accepts: {
                        script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
                    },
                    contents: {
                        script: /(?:java|ecma)script/
                    },
                    converters: {
                        'text script': function(e) {
                            return l.globalEval(e),
                            e;
                        }
                    }
                }),
                l.ajaxPrefilter('script', (function(e) {
                    void 0 === e.cache && (e.cache = !1),
                    e.crossDomain && (e.type = 'GET',
                    e.global = !1);
                }
                )),
                l.ajaxTransport('script', (function(e) {
                    if (e.crossDomain) {
                        var t, n = y.head || l('head')[0] || y.documentElement;
                        return {
                            send: function(r, o) {
                                (t = y.createElement('script')).async = !0,
                                e.scriptCharset && (t.charset = e.scriptCharset),
                                t.src = e.url,
                                t.onload = t.onreadystatechange = function(e, n) {
                                    (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null,
                                    t.parentNode && t.parentNode.removeChild(t),
                                    t = null,
                                    n || o(200, 'success'));
                                }
                                ,
                                n.insertBefore(t, n.firstChild);
                            },
                            abort: function() {
                                t && t.onload(void 0, !0);
                            }
                        };
                    }
                }
                ));
                var de = []
                    , pe = /(=)\?(?=&|$)|\?\?/;
                return l.ajaxSetup({
                    jsonp: 'callback',
                    jsonpCallback: function() {
                        var e = de.pop() || l.expando + '_' + U++;
                        return this[e] = !0,
                        e;
                    }
                }),
                l.ajaxPrefilter('json jsonp', (function(e, t, n) {
                    var r, o, i, a = !1 !== e.jsonp && (pe.test(e.url) ? 'url' : 'string' == typeof e.data && !(e.contentType || '').indexOf('application/x-www-form-urlencoded') && pe.test(e.data) && 'data');
                    if (a || 'jsonp' === e.dataTypes[0])
                        return r = e.jsonpCallback = l.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback,
                        a ? e[a] = e[a].replace(pe, '$1' + r) : !1 !== e.jsonp && (e.url += (M.test(e.url) ? '&' : '?') + e.jsonp + '=' + r),
                        e.converters['script json'] = function() {
                            return i || l.error(r + ' was not called'),
                            i[0];
                        }
                        ,
                        e.dataTypes[0] = 'json',
                        o = window[r],
                        window[r] = function() {
                            i = arguments;
                        }
                        ,
                        n.always((function() {
                            window[r] = o,
                            e[r] && (e.jsonpCallback = t.jsonpCallback,
                            de.push(r)),
                            i && l.isFunction(o) && o(i[0]),
                            i = o = void 0;
                        }
                        )),
                        'script';
                }
                )),
                l.parseHTML = function(e, t, n) {
                    if (!e || 'string' != typeof e)
                        return null;
                    'boolean' == typeof t && (n = t,
                    t = !1),
                    t = t || y;
                    var r = rsingleTag.exec(e)
                        , o = !n && [];
                    return r ? [t.createElement(r[1])] : (r = l.buildFragment([e], t, o),
                    o && o.length && l(o).remove(),
                    l.merge([], r.childNodes));
                }
                ,
                l;
            }()
            , r = function(e) {
                switch (typeof e) {
                    case 'string':
                        return e;
                    case 'boolean':
                        return e ? 'true' : 'false';
                    case 'number':
                        return isFinite(e) ? e : '';
                    default:
                        return '';
                }
            };
        e.exports = function(e, t) {
            if ((e = n.extend(!0, {
                headers: {},
                qs: {}
            }, e)).type = e.method,
            delete e.method,
            e.onProgress && (e.progress = e.onProgress,
            delete e.onProgress),
            e.qs) {
                var o = (i = e.qs,
                a = a || '&',
                s = s || '=',
                null === i && (i = void 0),
                'object' == typeof i ? Object.keys(i).map((function(e) {
                    var t = encodeURIComponent(r(e)) + s;
                    return Array.isArray(i[e]) ? i[e].map((function(e) {
                        return t + encodeURIComponent(r(e));
                    }
                    )).join(a) : t + encodeURIComponent(r(i[e]));
                }
                )).filter(Boolean).join(a) : c ? encodeURIComponent(r(c)) + s + encodeURIComponent(r(i)) : '');
                o && (e.url += (-1 === e.url.indexOf('?') ? '?' : '&') + o),
                delete e.qs;
            }
            var i, a, s, c;
            if (e.json && (e.data = e.body,
            delete e.json,
            delete e.body,
            !e.headers && (e.headers = {}),
            e.headers['Content-Type'] = 'application/json'),
            e.body && (e.body instanceof Blob || '[object File]' === e.body.toString() || '[object Blob]' === e.body.toString() || (e.data = e.body,
            delete e.body)),
            e.headers) {
                var u = e.headers;
                delete e.headers,
                e.beforeSend = function(e) {
                    for (var t in u)
                        u.hasOwnProperty(t) && 'content-length' !== t.toLowerCase() && 'user-agent' !== t.toLowerCase() && 'origin' !== t.toLowerCase() && 'host' !== t.toLowerCase() && e.setRequestHeader(t, u[t]);
                };
            }
            var l = function(e) {
                var t = {};
                return e.getAllResponseHeaders().trim().split('\n').forEach((function(e) {
                    if (e) {
                        var n = e.indexOf(':')
                            , r = e.substr(0, n).trim().toLowerCase()
                            , o = e.substr(n + 1).trim();
                        t[r] = o;
                    }
                }
                )),
                {
                    statusCode: e.status,
                    statusMessage: e.statusText,
                    headers: t
                };
            };
            return e.success = function(e, n, r) {
                t(null, l(r), e);
            }
            ,
            e.error = function(e) {
                e.responseText ? t(null, l(e), e.responseText) : t(e.statusText, l(e), e.responseText);
            }
            ,
            e.dataType = 'text',
            n.ajax(e);
        };
    }
    , function(e, t, n) {
        var r = n(18)
            , o = n(22)
            , i = n(16).EventProxy
            , a = n(8);
        function s(e, t) {
            var n = e.TaskId
                , s = e.Bucket
                , l = e.Region
                , d = e.Key
                , p = e.StorageClass
                , f = this
                , h = {}
                , m = e.FileSize
                , g = e.SliceSize
                , y = Math.ceil(m / g)
                , v = 0
                , C = a.throttleOnProgress.call(f, m, e.onHashProgress)
                , b = function(t, n) {
                    var r = t.length;
                    if (0 === r)
                        return n(null, !0);
                    if (r > y)
                        return n(null, !1);
                    if (r > 1 && Math.max(t[0].Size, t[1].Size) !== g)
                        return n(null, !1);
                    var o = function(i) {
                        if (i < r) {
                            var s = t[i];
                            !function(t, n) {
                                var r = g * (t - 1)
                                    , o = Math.min(r + g, m)
                                    , i = o - r;
                                h[t] ? n(null, {
                                    PartNumber: t,
                                    ETag: h[t],
                                    Size: i
                                }) : a.fileSlice(e.Body, r, o, !1, (function(e) {
                                    a.getFileMd5(e, (function(e, r) {
                                        if (e)
                                            return n(e);
                                        var o = '"' + r + '"';
                                        h[t] = o,
                                        1,
                                        v += i,
                                        n(e, {
                                            PartNumber: t,
                                            ETag: o,
                                            Size: i
                                        }),
                                        C({
                                            loaded: v,
                                            total: m
                                        });
                                    }
                                    ));
                                }
                                ));
                            }(s.PartNumber, (function(e, t) {
                                t && t.ETag === s.ETag && t.Size === s.Size ? o(i + 1) : n(null, !1);
                            }
                            ));
                        } else
                            n(null, !0);
                    };
                    o(0);
                }
                , S = new i;
            S.on('error', (function(e) {
                if (f._isRunningTask(n))
                    return t(e);
            }
            )),
            S.on('upload_id_available', (function(e) {
                var n = {}
                    , r = [];
                a.each(e.PartList, (function(e) {
                    n[e.PartNumber] = e;
                }
                ));
                for (var o = 1; o <= y; o++) {
                    var i = n[o];
                    i ? (i.PartNumber = o,
                    i.Uploaded = !0) : i = {
                        PartNumber: o,
                        ETag: null,
                        Uploaded: !1
                    },
                    r.push(i);
                }
                e.PartList = r,
                t(null, e);
            }
            )),
            S.on('no_available_upload_id', (function() {
                if (f._isRunningTask(n)) {
                    var r = a.extend({
                            Bucket: s,
                            Region: l,
                            Key: d,
                            Headers: a.clone(e.Headers),
                            StorageClass: p,
                            Body: e.Body
                        }, e)
                        , o = e.Headers['Content-Type'] || e.Body && e.Body.type;
                    o && (r.Headers['Content-Type'] = o),
                    f.multipartInit(r, (function(e, r) {
                        if (f._isRunningTask(n)) {
                            if (e)
                                return S.emit('error', e);
                            var o = r.UploadId;
                            if (!o)
                                return t({
                                    Message: 'no upload id'
                                });
                            S.emit('upload_id_available', {
                                UploadId: o,
                                PartList: []
                            });
                        }
                    }
                    ));
                }
            }
            )),
            S.on('has_and_check_upload_id', (function(e) {
                e = e.reverse(),
                o.eachLimit(e, 1, (function(e, t) {
                    f._isRunningTask(n) && (r.using[e] ? t() : u.call(f, {
                        Bucket: s,
                        Region: l,
                        Key: d,
                        UploadId: e
                    }, (function(o, i) {
                        if (f._isRunningTask(n)) {
                            if (o)
                                return r.removeUsing(e),
                                S.emit('error', o);
                            var a = i.PartList;
                            a.forEach((function(e) {
                                e.PartNumber *= 1,
                                e.Size *= 1,
                                e.ETag = e.ETag || '';
                            }
                            )),
                            b(a, (function(r, o) {
                                if (f._isRunningTask(n))
                                    return r ? S.emit('error', r) : void (o ? t({
                                        UploadId: e,
                                        PartList: a
                                    }) : t());
                            }
                            ));
                        }
                    }
                    )));
                }
                ), (function(e) {
                    f._isRunningTask(n) && (C(null, !0),
                    e && e.UploadId ? S.emit('upload_id_available', e) : S.emit('no_available_upload_id'));
                }
                ));
            }
            )),
            S.on('seek_local_avail_upload_id', (function(t) {
                var o = r.getFileId(e.Body, e.ChunkSize, s, d)
                    , i = r.getUploadIdList(o);
                if (o && i) {
                    var c = function(e) {
                        if (e >= i.length)
                            S.emit('has_and_check_upload_id', t);
                        else {
                            var o = i[e];
                            if (!a.isInArray(t, o))
                                return r.removeUploadId(o),
                                void c(e + 1);
                            r.using[o] ? c(e + 1) : u.call(f, {
                                Bucket: s,
                                Region: l,
                                Key: d,
                                UploadId: o
                            }, (function(t, i) {
                                f._isRunningTask(n) && (t ? (r.removeUploadId(o),
                                c(e + 1)) : S.emit('upload_id_available', {
                                    UploadId: o,
                                    PartList: i.PartList
                                }));
                            }
                            ));
                        }
                    };
                    c(0);
                } else
                    S.emit('has_and_check_upload_id', t);
            }
            )),
            S.on('get_remote_upload_id_list', (function(t) {
                c.call(f, {
                    Bucket: s,
                    Region: l,
                    Key: d
                }, (function(t, o) {
                    if (f._isRunningTask(n)) {
                        if (t)
                            return S.emit('error', t);
                        var i = a.filter(o.UploadList, (function(e) {
                            return e.Key === d && (!p || e.StorageClass.toUpperCase() === p.toUpperCase());
                        }
                        )).reverse().map((function(e) {
                            return e.UploadId || e.UploadID;
                        }
                        ));
                        if (i.length)
                            S.emit('seek_local_avail_upload_id', i);
                        else {
                            var c, u = r.getFileId(e.Body, e.ChunkSize, s, d);
                            u && (c = r.getUploadIdList(u)) && a.each(c, (function(e) {
                                r.removeUploadId(e);
                            }
                            )),
                            S.emit('no_available_upload_id');
                        }
                    }
                }
                ));
            }
            )),
            S.emit('get_remote_upload_id_list');
        }
        function c(e, t) {
            var n = this
                , r = []
                , o = {
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Prefix: e.Key
                }
                , i = function() {
                    n.multipartList(o, (function(e, n) {
                        if (e)
                            return t(e);
                        r.push.apply(r, n.Upload || []),
                        'true' === n.IsTruncated ? (o.KeyMarker = n.NextKeyMarker,
                        o.UploadIdMarker = n.NextUploadIdMarker,
                        i()) : t(null, {
                            UploadList: r
                        });
                    }
                    ));
                };
            i();
        }
        function u(e, t) {
            var n = this
                , r = []
                , o = {
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    UploadId: e.UploadId
                }
                , i = function() {
                    n.multipartListPart(o, (function(e, n) {
                        if (e)
                            return t(e);
                        r.push.apply(r, n.Part || []),
                        'true' === n.IsTruncated ? (o.PartNumberMarker = n.NextPartNumberMarker,
                        i()) : t(null, {
                            PartList: r
                        });
                    }
                    ));
                };
            i();
        }
        function l(e, t) {
            var n = this
                , r = e.TaskId
                , i = e.Bucket
                , s = e.Region
                , c = e.Key
                , u = e.UploadData
                , l = e.FileSize
                , p = e.SliceSize
                , f = Math.min(e.AsyncLimit || n.options.ChunkParallelLimit || 1, 256)
                , h = e.Body
                , m = Math.ceil(l / p)
                , g = 0
                , y = e.ServerSideEncryption
                , v = a.filter(u.PartList, (function(e) {
                    return e.Uploaded && (g += e.PartNumber >= m && l % p || p),
                    !e.Uploaded;
                }
                ))
                , C = e.onProgress;
            o.eachLimit(v, f, (function(e, t) {
                if (n._isRunningTask(r)) {
                    var o = e.PartNumber
                        , f = Math.min(l, e.PartNumber * p) - (e.PartNumber - 1) * p
                        , m = 0;
                    d.call(n, {
                        TaskId: r,
                        Bucket: i,
                        Region: s,
                        Key: c,
                        SliceSize: p,
                        FileSize: l,
                        PartNumber: o,
                        ServerSideEncryption: y,
                        Body: h,
                        UploadData: u,
                        onProgress: function(e) {
                            g += e.loaded - m,
                            m = e.loaded,
                            C({
                                loaded: g,
                                total: l
                            });
                        }
                    }, (function(o, i) {
                        n._isRunningTask(r) && (!a.isBrowser || o || i.ETag || (o = 'get ETag error, please add "ETag" to CORS ExposeHeader setting.'),
                        o ? g -= m : (g += f - m,
                        e.ETag = i.ETag),
                        t(o || null, i));
                    }
                    ));
                }
            }
            ), (function(e) {
                if (n._isRunningTask(r))
                    return e ? t(e) : void t(null, {
                        UploadId: u.UploadId,
                        SliceList: u.PartList
                    });
            }
            ));
        }
        function d(e, t) {
            var n = this
                , r = e.TaskId
                , i = e.Bucket
                , s = e.Region
                , c = e.Key
                , u = e.FileSize
                , l = e.Body
                , d = 1 * e.PartNumber
                , p = e.SliceSize
                , f = e.ServerSideEncryption
                , h = e.UploadData
                , m = n.options.ChunkRetryTimes + 1
                , g = p * (d - 1)
                , y = p
                , v = g + p;
            v > u && (y = (v = u) - g);
            var C = h.PartList[d - 1];
            o.retry(m, (function(t) {
                n._isRunningTask(r) && a.fileSlice(l, g, v, !0, (function(o) {
                    n.multipartUpload({
                        TaskId: r,
                        Bucket: i,
                        Region: s,
                        Key: c,
                        ContentLength: y,
                        PartNumber: d,
                        UploadId: h.UploadId,
                        ServerSideEncryption: f,
                        Body: o,
                        onProgress: e.onProgress
                    }, (function(e, o) {
                        if (n._isRunningTask(r))
                            return e ? t(e) : (C.Uploaded = !0,
                            t(null, o));
                    }
                    ));
                }
                ));
            }
            ), (function(e, o) {
                if (n._isRunningTask(r))
                    return t(e, o);
            }
            ));
        }
        function p(e, t) {
            var n = e.Bucket
                , r = e.Region
                , i = e.Key
                , a = e.UploadId
                , s = e.SliceList
                , c = this
                , u = this.options.ChunkRetryTimes + 1
                , l = s.map((function(e) {
                    return {
                        PartNumber: e.PartNumber,
                        ETag: e.ETag
                    };
                }
                ));
            o.retry(u, (function(e) {
                c.multipartComplete({
                    Bucket: n,
                    Region: r,
                    Key: i,
                    UploadId: a,
                    Parts: l
                }, e);
            }
            ), (function(e, n) {
                t(e, n);
            }
            ));
        }
        function f(e, t) {
            var n = e.Bucket
                , r = e.Region
                , i = e.Key
                , a = e.AbortArray
                , s = e.AsyncLimit || 1
                , c = this
                , u = 0
                , l = new Array(a.length);
            o.eachLimit(a, s, (function(t, o) {
                var a = u;
                if (i && i !== t.Key)
                    return l[a] = {
                        error: {
                            KeyNotMatch: !0
                        }
                    },
                    void o(null);
                var s = t.UploadId || t.UploadID;
                c.multipartAbort({
                    Bucket: n,
                    Region: r,
                    Key: t.Key,
                    Headers: e.Headers,
                    UploadId: s
                }, (function(e, i) {
                    var c = {
                        Bucket: n,
                        Region: r,
                        Key: t.Key,
                        UploadId: s
                    };
                    l[a] = {
                        error: e,
                        task: c
                    },
                    o(null);
                }
                )),
                u++;
            }
            ), (function(e) {
                if (e)
                    return t(e);
                for (var n = [], r = [], o = 0, i = l.length; o < i; o++) {
                    var a = l[o];
                    a.task && (a.error ? r.push(a.task) : n.push(a.task));
                }
                return t(null, {
                    successList: n,
                    errorList: r
                });
            }
            ));
        }
        function h(e, t) {
            var n = e.TaskId
                , r = e.Bucket
                , i = e.Region
                , a = e.Key
                , s = e.CopySource
                , c = e.UploadId
                , u = 1 * e.PartNumber
                , l = e.CopySourceRange
                , d = this.options.ChunkRetryTimes + 1
                , p = this;
            o.retry(d, (function(t) {
                p.uploadPartCopy({
                    TaskId: n,
                    Bucket: r,
                    Region: i,
                    Key: a,
                    CopySource: s,
                    UploadId: c,
                    PartNumber: u,
                    CopySourceRange: l,
                    onProgress: e.onProgress
                }, (function(e, n) {
                    t(e || null, n);
                }
                ));
            }
            ), (function(e, n) {
                return t(e, n);
            }
            ));
        }
        var m = {
            sliceUploadFile: function(e, t) {
                var n, o, c = this, u = new i, d = e.TaskId, f = e.Bucket, h = e.Region, m = e.Key, g = e.Body, y = e.ChunkSize || e.SliceSize || c.options.ChunkSize, v = e.AsyncLimit, C = e.StorageClass || 'Standard', b = e.ServerSideEncryption, S = e.onHashProgress;
                u.on('error', (function(e) {
                    if (c._isRunningTask(d))
                        return t(e);
                }
                )),
                u.on('upload_complete', (function(e) {
                    t(null, e);
                }
                )),
                u.on('upload_slice_complete', (function(e) {
                    p.call(c, {
                        Bucket: f,
                        Region: h,
                        Key: m,
                        UploadId: e.UploadId,
                        SliceList: e.SliceList
                    }, (function(t, i) {
                        if (c._isRunningTask(d)) {
                            if (r.removeUsing(e.UploadId),
                            t)
                                return o(null, !0),
                                u.emit('error', t);
                            r.removeUploadId(e.UploadId),
                            o({
                                loaded: n,
                                total: n
                            }, !0),
                            u.emit('upload_complete', i);
                        }
                    }
                    ));
                }
                )),
                u.on('get_upload_data_finish', (function(t) {
                    var i = r.getFileId(g, e.ChunkSize, f, m);
                    i && r.saveUploadId(i, t.UploadId, c.options.UploadIdCacheLimit),
                    r.setUsing(t.UploadId),
                    o(null, !0),
                    l.call(c, {
                        TaskId: d,
                        Bucket: f,
                        Region: h,
                        Key: m,
                        Body: g,
                        FileSize: n,
                        SliceSize: y,
                        AsyncLimit: v,
                        ServerSideEncryption: b,
                        UploadData: t,
                        onProgress: o
                    }, (function(e, t) {
                        if (c._isRunningTask(d))
                            return e ? (o(null, !0),
                            u.emit('error', e)) : void u.emit('upload_slice_complete', t);
                    }
                    ));
                }
                )),
                u.on('get_file_size_finish', (function() {
                    if (o = a.throttleOnProgress.call(c, n, e.onProgress),
                    e.UploadData.UploadId)
                        u.emit('get_upload_data_finish', e.UploadData);
                    else {
                        var t = a.extend({
                            TaskId: d,
                            Bucket: f,
                            Region: h,
                            Key: m,
                            Headers: e.Headers,
                            StorageClass: C,
                            Body: g,
                            FileSize: n,
                            SliceSize: y,
                            onHashProgress: S
                        }, e);
                        s.call(c, t, (function(t, n) {
                            if (c._isRunningTask(d)) {
                                if (t)
                                    return u.emit('error', t);
                                e.UploadData.UploadId = n.UploadId,
                                e.UploadData.PartList = n.PartList,
                                u.emit('get_upload_data_finish', e.UploadData);
                            }
                        }
                        ));
                    }
                }
                )),
                n = e.ContentLength,
                delete e.ContentLength,
                !e.Headers && (e.Headers = {}),
                a.each(e.Headers, (function(t, n) {
                    'content-length' === n.toLowerCase() && delete e.Headers[n];
                }
                )),
                function() {
                    for (var t = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 5120], r = 1048576, o = 0; o < t.length && !(n / (r = 1024 * t[o] * 1024) <= c.options.MaxPartNumber); o++)
                        ;
                    e.ChunkSize = e.SliceSize = y = Math.max(y, r);
                }(),
                0 === n ? (e.Body = '',
                e.ContentLength = 0,
                e.SkipTask = !0,
                c.putObject(e, (function(e, n) {
                    if (e)
                        return t(e);
                    t(null, n);
                }
                ))) : u.emit('get_file_size_finish');
            },
            abortUploadTask: function(e, t) {
                var n = e.Bucket
                    , r = e.Region
                    , o = e.Key
                    , a = e.UploadId
                    , s = e.Level || 'task'
                    , u = e.AsyncLimit
                    , l = this
                    , d = new i;
                if (d.on('error', (function(e) {
                    return t(e);
                }
                )),
                d.on('get_abort_array', (function(i) {
                    f.call(l, {
                        Bucket: n,
                        Region: r,
                        Key: o,
                        Headers: e.Headers,
                        AsyncLimit: u,
                        AbortArray: i
                    }, (function(e, n) {
                        if (e)
                            return t(e);
                        t(null, n);
                    }
                    ));
                }
                )),
                'bucket' === s)
                    c.call(l, {
                        Bucket: n,
                        Region: r
                    }, (function(e, n) {
                        if (e)
                            return t(e);
                        d.emit('get_abort_array', n.UploadList || []);
                    }
                    ));
                else if ('file' === s) {
                    if (!o)
                        return t({
                            error: 'abort_upload_task_no_key'
                        });
                    c.call(l, {
                        Bucket: n,
                        Region: r,
                        Key: o
                    }, (function(e, n) {
                        if (e)
                            return t(e);
                        d.emit('get_abort_array', n.UploadList || []);
                    }
                    ));
                } else {
                    if ('task' !== s)
                        return t({
                            error: 'abort_unknown_level'
                        });
                    if (!a)
                        return t({
                            error: 'abort_upload_task_no_id'
                        });
                    if (!o)
                        return t({
                            error: 'abort_upload_task_no_key'
                        });
                    d.emit('get_abort_array', [{
                        Key: o,
                        UploadId: a
                    }]);
                }
            },
            uploadFiles: function(e, t) {
                var n = void 0 === e.SliceSize ? this.options.SliceSize : e.SliceSize
                    , r = 0
                    , o = 0
                    , i = a.throttleOnProgress.call(this, o, e.onProgress)
                    , s = e.files.length
                    , c = e.onFileFinish
                    , u = Array(s)
                    , l = function(e, n, r) {
                        i(null, !0),
                        c && c(e, n, r),
                        u[r.Index] = {
                            options: r,
                            error: e,
                            data: n
                        },
                        --s <= 0 && t && t(null, {
                            files: u
                        });
                    }
                    , d = [];
                a.each(e.files, (function(e, t) {
                    !function() {
                        var s = e.Body
                            , c = s.size || s.length || 0
                            , u = {
                                Index: t,
                                TaskId: ''
                            };
                        r += c,
                        a.each(e, (function(e, t) {
                            'object' != typeof e && 'function' != typeof e && (u[t] = e);
                        }
                        ));
                        var p = e.onTaskReady;
                        e.onTaskReady = function(e) {
                            u.TaskId = e,
                            p && p(e);
                        }
                        ;
                        var f = 0
                            , h = e.onProgress;
                        e.onProgress = function(e) {
                            o = o - f + e.loaded,
                            f = e.loaded,
                            h && h(e),
                            i({
                                loaded: o,
                                total: r
                            });
                        }
                        ;
                        var m = e.onFileFinish
                            , g = c >= n ? 'sliceUploadFile' : 'putObject';
                        d.push({
                            api: g,
                            params: e,
                            callback: function(e, t) {
                                m && m(e, t),
                                l && l(e, t, u);
                            }
                        });
                    }();
                }
                )),
                this._addTasks(d);
            },
            sliceCopyFile: function(e, t) {
                var n = new i
                    , r = this
                    , s = e.Bucket
                    , c = e.Region
                    , u = e.Key
                    , l = e.CopySource
                    , d = l.match(/^([^.]+-\d+)\.cos(v6)?\.([^.]+)\.[^/]+\/(.+)$/);
                if (d) {
                    var p = d[1]
                        , f = d[3]
                        , m = decodeURIComponent(d[4])
                        , g = void 0 === e.CopySliceSize ? r.options.CopySliceSize : e.CopySliceSize;
                    g = Math.max(0, g);
                    var y, v, C = e.CopyChunkSize || this.options.CopyChunkSize, b = this.options.CopyChunkParallelLimit, S = 0;
                    n.on('copy_slice_complete', (function(e) {
                        r.multipartComplete({
                            Bucket: s,
                            Region: c,
                            Key: u,
                            UploadId: e.UploadId,
                            Parts: e.PartList
                        }, (function(e, n) {
                            if (e)
                                return v(null, !0),
                                t(e);
                            v({
                                loaded: y,
                                total: y
                            }, !0),
                            t(null, n);
                        }
                        ));
                    }
                    )),
                    n.on('get_copy_data_finish', (function(e) {
                        o.eachLimit(e.PartList, b, (function(t, n) {
                            var o = t.PartNumber
                                , i = t.CopySourceRange
                                , a = t.end - t.start
                                , d = 0;
                            h.call(r, {
                                Bucket: s,
                                Region: c,
                                Key: u,
                                CopySource: l,
                                UploadId: e.UploadId,
                                PartNumber: o,
                                CopySourceRange: i,
                                onProgress: function(e) {
                                    S += e.loaded - d,
                                    d = e.loaded,
                                    v({
                                        loaded: S,
                                        total: y
                                    });
                                }
                            }, (function(e, r) {
                                if (e)
                                    return n(e);
                                v({
                                    loaded: S,
                                    total: y
                                }),
                                S += a - d,
                                t.ETag = r.ETag,
                                n(e || null, r);
                            }
                            ));
                        }
                        ), (function(r) {
                            if (r)
                                return v(null, !0),
                                t(r);
                            n.emit('copy_slice_complete', e);
                        }
                        ));
                    }
                    )),
                    n.on('get_file_size_finish', (function(o) {
                        var i;
                        if (function() {
                            for (var t = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 5120], n = 1048576, o = 0; o < t.length && !(y / (n = 1024 * t[o] * 1024) <= r.options.MaxPartNumber); o++)
                                ;
                            e.ChunkSize = C = Math.max(C, n);
                            for (var i = Math.ceil(y / C), a = [], s = 1; s <= i; s++) {
                                var c = (s - 1) * C
                                    , u = s * C < y ? s * C - 1 : y - 1
                                    , l = {
                                        PartNumber: s,
                                        start: c,
                                        end: u,
                                        CopySourceRange: 'bytes=' + c + '-' + u
                                    };
                                a.push(l);
                            }
                            e.PartList = a;
                        }(),
                        (i = 'Replaced' === e.Headers['x-cos-metadata-directive'] ? e.Headers : o)['x-cos-storage-class'] = e.Headers['x-cos-storage-class'] || o['x-cos-storage-class'],
                        i = a.clearKey(i),
                        'ARCHIVE' === o['x-cos-storage-class']) {
                            var l = o['x-cos-restore'];
                            if (!l || 'ongoing-request="true"' === l)
                                return void t({
                                    error: 'Unrestored archive object is not allowed to be copied'
                                });
                        }
                        delete i['x-cos-copy-source'],
                        delete i['x-cos-metadata-directive'],
                        delete i['x-cos-copy-source-If-Modified-Since'],
                        delete i['x-cos-copy-source-If-Unmodified-Since'],
                        delete i['x-cos-copy-source-If-Match'],
                        delete i['x-cos-copy-source-If-None-Match'],
                        r.multipartInit({
                            Bucket: s,
                            Region: c,
                            Key: u,
                            Headers: i
                        }, (function(r, o) {
                            if (r)
                                return t(r);
                            e.UploadId = o.UploadId,
                            n.emit('get_copy_data_finish', e);
                        }
                        ));
                    }
                    )),
                    r.headObject({
                        Bucket: p,
                        Region: f,
                        Key: m
                    }, (function(o, i) {
                        if (o)
                            o.statusCode && 404 === o.statusCode ? t({
                                ErrorStatus: m + ' Not Exist'
                            }) : t(o);
                        else if (void 0 !== (y = e.FileSize = i.headers['content-length']) && y)
                            if (v = a.throttleOnProgress.call(r, y, e.onProgress),
                            y <= g)
                                e.Headers['x-cos-metadata-directive'] || (e.Headers['x-cos-metadata-directive'] = 'Copy'),
                                r.putObjectCopy(e, (function(e, n) {
                                    if (e)
                                        return v(null, !0),
                                        t(e);
                                    v({
                                        loaded: y,
                                        total: y
                                    }, !0),
                                    t(e, n);
                                }
                                ));
                            else {
                                var s = i.headers
                                    , c = {
                                        'Cache-Control': s['cache-control'],
                                        'Content-Disposition': s['content-disposition'],
                                        'Content-Encoding': s['content-encoding'],
                                        'Content-Type': s['content-type'],
                                        Expires: s.expires,
                                        'x-cos-storage-class': s['x-cos-storage-class']
                                    };
                                a.each(s, (function(e, t) {
                                    0 === t.indexOf('x-cos-meta-') && t.length > 'x-cos-meta-'.length && (c[t] = e);
                                }
                                )),
                                n.emit('get_file_size_finish', c);
                            }
                        else
                            t({
                                error: 'get Content-Length error, please add "Content-Length" to CORS ExposeHeader setting.'
                            });
                    }
                    ));
                } else
                    t({
                        error: 'CopySource format error'
                    });
            }
        };
        e.exports.init = function(e, t) {
            t.transferToTaskMethod(m, 'sliceUploadFile'),
            a.each(m, (function(t, n) {
                e.prototype[n] = a.apiWrapper(n, t);
            }
            ));
        };
    }
    , function(e, t) {
        var n = {
            eachLimit: function(e, t, n, r) {
                if (r = r || function() {}
                ,
                !e.length || t <= 0)
                    return r();
                var o = 0
                    , i = 0
                    , a = 0;
                !function s() {
                    if (o >= e.length)
                        return r();
                    for (; a < t && i < e.length; )
                        a += 1,
                        n(e[(i += 1) - 1], (function(t) {
                            t ? (r(t),
                            r = function() {}
                            ) : (a -= 1,
                            (o += 1) >= e.length ? r() : s());
                        }
                        ));
                }();
            },
            retry: function(e, t, n) {
                var r = function(o) {
                    t((function(t, i) {
                        t && o < e ? r(o + 1) : n(t, i);
                    }
                    ));
                };
                e < 1 ? n() : r(1);
            }
        };
        e.exports = n;
    }
    , function(e, t, n) {
        'use strict';
        var r, o = 'object' == typeof Reflect ? Reflect : null, i = o && 'function' == typeof o.apply ? o.apply : function(e, t, n) {
            return Function.prototype.apply.call(e, t, n);
        }
        ;
        r = o && 'function' == typeof o.ownKeys ? o.ownKeys : Object.getOwnPropertySymbols ? function(e) {
            return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
        }
            : function(e) {
                return Object.getOwnPropertyNames(e);
            }
        ;
        var a = Number.isNaN || function(e) {
            return e != e;
        }
        ;
        function s() {
            s.init.call(this);
        }
        e.exports = s,
        e.exports.once = function(e, t) {
            return new Promise((function(n, r) {
                function o() {
                    void 0 !== i && e.removeListener('error', i),
                    n([].slice.call(arguments));
                }
                var i;
                'error' !== t && (i = function(n) {
                    e.removeListener(t, o),
                    r(n);
                }
                ,
                e.once('error', i)),
                e.once(t, o);
            }
            ));
        }
        ,
        s.EventEmitter = s,
        s.prototype._events = void 0,
        s.prototype._eventsCount = 0,
        s.prototype._maxListeners = void 0;
        var c = 10;
        function u(e) {
            if ('function' != typeof e)
                throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
        }
        function l(e) {
            return void 0 === e._maxListeners ? s.defaultMaxListeners : e._maxListeners;
        }
        function d(e, t, n, r) {
            var o, i, a, s;
            if (u(n),
            void 0 === (i = e._events) ? (i = e._events = Object.create(null),
            e._eventsCount = 0) : (void 0 !== i.newListener && (e.emit('newListener', t, n.listener ? n.listener : n),
            i = e._events),
            a = i[t]),
            void 0 === a)
                a = i[t] = n,
                ++e._eventsCount;
            else if ('function' == typeof a ? a = i[t] = r ? [n, a] : [a, n] : r ? a.unshift(n) : a.push(n),
            (o = l(e)) > 0 && a.length > o && !a.warned) {
                a.warned = !0;
                var c = new Error('Possible EventEmitter memory leak detected. ' + a.length + ' ' + String(t) + ' listeners added. Use emitter.setMaxListeners() to increase limit');
                c.name = 'MaxListenersExceededWarning',
                c.emitter = e,
                c.type = t,
                c.count = a.length,
                s = c,
                console && console.warn && console.warn(s);
            }
            return e;
        }
        function p() {
            if (!this.fired)
                return this.target.removeListener(this.type, this.wrapFn),
                this.fired = !0,
                0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
        }
        function f(e, t, n) {
            var r = {
                    fired: !1,
                    wrapFn: void 0,
                    target: e,
                    type: t,
                    listener: n
                }
                , o = p.bind(r);
            return o.listener = n,
            r.wrapFn = o,
            o;
        }
        function h(e, t, n) {
            var r = e._events;
            if (void 0 === r)
                return [];
            var o = r[t];
            return void 0 === o ? [] : 'function' == typeof o ? n ? [o.listener || o] : [o] : n ? function(e) {
                for (var t = new Array(e.length), n = 0; n < t.length; ++n)
                    t[n] = e[n].listener || e[n];
                return t;
            }(o) : g(o, o.length);
        }
        function m(e) {
            var t = this._events;
            if (void 0 !== t) {
                var n = t[e];
                if ('function' == typeof n)
                    return 1;
                if (void 0 !== n)
                    return n.length;
            }
            return 0;
        }
        function g(e, t) {
            for (var n = new Array(t), r = 0; r < t; ++r)
                n[r] = e[r];
            return n;
        }
        Object.defineProperty(s, 'defaultMaxListeners', {
            enumerable: !0,
            get: function() {
                return c;
            },
            set: function(e) {
                if ('number' != typeof e || e < 0 || a(e))
                    throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + '.');
                c = e;
            }
        }),
        s.init = function() {
            void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null),
            this._eventsCount = 0),
            this._maxListeners = this._maxListeners || void 0;
        }
        ,
        s.prototype.setMaxListeners = function(e) {
            if ('number' != typeof e || e < 0 || a(e))
                throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + '.');
            return this._maxListeners = e,
            this;
        }
        ,
        s.prototype.getMaxListeners = function() {
            return l(this);
        }
        ,
        s.prototype.emit = function(e) {
            for (var t = [], n = 1; n < arguments.length; n++)
                t.push(arguments[n]);
            var r = 'error' === e
                , o = this._events;
            if (void 0 !== o)
                r = r && void 0 === o.error;
            else if (!r)
                return !1;
            if (r) {
                var a;
                if (t.length > 0 && (a = t[0]),
                a instanceof Error)
                    throw a;
                var s = new Error('Unhandled error.' + (a ? ' (' + a.message + ')' : ''));
                throw s.context = a,
                s;
            }
            var c = o[e];
            if (void 0 === c)
                return !1;
            if ('function' == typeof c)
                i(c, this, t);
            else {
                var u = c.length
                    , l = g(c, u);
                for (n = 0; n < u; ++n)
                    i(l[n], this, t);
            }
            return !0;
        }
        ,
        s.prototype.addListener = function(e, t) {
            return d(this, e, t, !1);
        }
        ,
        s.prototype.on = s.prototype.addListener,
        s.prototype.prependListener = function(e, t) {
            return d(this, e, t, !0);
        }
        ,
        s.prototype.once = function(e, t) {
            return u(t),
            this.on(e, f(this, e, t)),
            this;
        }
        ,
        s.prototype.prependOnceListener = function(e, t) {
            return u(t),
            this.prependListener(e, f(this, e, t)),
            this;
        }
        ,
        s.prototype.removeListener = function(e, t) {
            var n, r, o, i, a;
            if (u(t),
            void 0 === (r = this._events))
                return this;
            if (void 0 === (n = r[e]))
                return this;
            if (n === t || n.listener === t)
                0 == --this._eventsCount ? this._events = Object.create(null) : (delete r[e],
                r.removeListener && this.emit('removeListener', e, n.listener || t));
            else if ('function' != typeof n) {
                for (o = -1,
                i = n.length - 1; i >= 0; i--)
                    if (n[i] === t || n[i].listener === t) {
                        a = n[i].listener,
                        o = i;
                        break;
                    }
                if (o < 0)
                    return this;
                0 === o ? n.shift() : function(e, t) {
                    for (; t + 1 < e.length; t++)
                        e[t] = e[t + 1];
                    e.pop();
                }(n, o),
                1 === n.length && (r[e] = n[0]),
                void 0 !== r.removeListener && this.emit('removeListener', e, a || t);
            }
            return this;
        }
        ,
        s.prototype.off = s.prototype.removeListener,
        s.prototype.removeAllListeners = function(e) {
            var t, n, r;
            if (void 0 === (n = this._events))
                return this;
            if (void 0 === n.removeListener)
                return 0 === arguments.length ? (this._events = Object.create(null),
                this._eventsCount = 0) : void 0 !== n[e] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete n[e]),
                this;
            if (0 === arguments.length) {
                var o, i = Object.keys(n);
                for (r = 0; r < i.length; ++r)
                    'removeListener' !== (o = i[r]) && this.removeAllListeners(o);
                return this.removeAllListeners('removeListener'),
                this._events = Object.create(null),
                this._eventsCount = 0,
                this;
            }
            if ('function' == typeof (t = n[e]))
                this.removeListener(e, t);
            else if (void 0 !== t)
                for (r = t.length - 1; r >= 0; r--)
                    this.removeListener(e, t[r]);
            return this;
        }
        ,
        s.prototype.listeners = function(e) {
            return h(this, e, !0);
        }
        ,
        s.prototype.rawListeners = function(e) {
            return h(this, e, !1);
        }
        ,
        s.listenerCount = function(e, t) {
            return 'function' == typeof e.listenerCount ? e.listenerCount(t) : m.call(e, t);
        }
        ,
        s.prototype.listenerCount = m,
        s.prototype.eventNames = function() {
            return this._eventsCount > 0 ? r(this._events) : [];
        };
    }
    , function(e, t, n) {
        e.exports = n(25);
    }
    , function(e, t, n) {
        'use strict';
        var r = n(26)
            , o = n(27)
            , i = n(29)
            , a = n(30);
        function s(e) {
            var t = new i(e)
                , n = o(i.prototype.request, t);
            return r.extend(n, i.prototype, t),
            r.extend(n, t),
            n;
        }
        var c = s(a);
        c.Axios = i,
        c.create = function(e) {
            return s(r.merge(a, e));
        }
        ,
        c.Cancel = n(46),
        c.CancelToken = n(47),
        c.isCancel = n(43),
        c.all = function(e) {
            return Promise.all(e);
        }
        ,
        c.spread = n(48),
        e.exports = c,
        e.exports.default = c;
    }
    , function(e, t, n) {
        'use strict';
        var r = n(27)
            , o = n(28)
            , i = Object.prototype.toString;
        function a(e) {
            return '[object Array]' === i.call(e);
        }
        function s(e) {
            return null !== e && 'object' == typeof e;
        }
        function c(e) {
            return '[object Function]' === i.call(e);
        }
        function u(e, t) {
            if (null != e)
                if ('object' != typeof e && (e = [e]),
                a(e))
                    for (var n = 0, r = e.length; n < r; n++)
                        t.call(null, e[n], n, e);
                else
                    for (var o in e)
                        Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e);
        }
        e.exports = {
            isArray: a,
            isArrayBuffer: function(e) {
                return '[object ArrayBuffer]' === i.call(e);
            },
            isBuffer: o,
            isFormData: function(e) {
                return 'undefined' != typeof FormData && e instanceof FormData;
            },
            isArrayBufferView: function(e) {
                return 'undefined' != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer;
            },
            isString: function(e) {
                return 'string' == typeof e;
            },
            isNumber: function(e) {
                return 'number' == typeof e;
            },
            isObject: s,
            isUndefined: function(e) {
                return void 0 === e;
            },
            isDate: function(e) {
                return '[object Date]' === i.call(e);
            },
            isFile: function(e) {
                return '[object File]' === i.call(e);
            },
            isBlob: function(e) {
                return '[object Blob]' === i.call(e);
            },
            isFunction: c,
            isStream: function(e) {
                return s(e) && c(e.pipe);
            },
            isURLSearchParams: function(e) {
                return 'undefined' != typeof URLSearchParams && e instanceof URLSearchParams;
            },
            isStandardBrowserEnv: function() {
                return ('undefined' == typeof navigator || 'ReactNative' !== navigator.product) && ('undefined' != typeof window && 'undefined' != typeof document);
            },
            forEach: u,
            merge: function e() {
                var t = {};
                function n(n, r) {
                    'object' == typeof t[r] && 'object' == typeof n ? t[r] = e(t[r], n) : t[r] = n;
                }
                for (var r = 0, o = arguments.length; r < o; r++)
                    u(arguments[r], n);
                return t;
            },
            extend: function(e, t, n) {
                return u(t, (function(t, o) {
                    e[o] = n && 'function' == typeof t ? r(t, n) : t;
                }
                )),
                e;
            },
            trim: function(e) {
                return e.replace(/^\s*/, '').replace(/\s*$/, '');
            }
        };
    }
    , function(e, t, n) {
        'use strict';
        e.exports = function(e, t) {
            return function() {
                for (var n = new Array(arguments.length), r = 0; r < n.length; r++)
                    n[r] = arguments[r];
                return e.apply(t, n);
            };
        };
    }
    , function(e, t) {
        /*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
        e.exports = function(e) {
            return null != e && null != e.constructor && 'function' == typeof e.constructor.isBuffer && e.constructor.isBuffer(e);
        };
    }
    , function(e, t, n) {
        'use strict';
        var r = n(30)
            , o = n(26)
            , i = n(40)
            , a = n(41);
        function s(e) {
            this.defaults = e,
            this.interceptors = {
                request: new i,
                response: new i
            };
        }
        s.prototype.request = function(e) {
            'string' == typeof e && (e = o.merge({
                url: arguments[0]
            }, arguments[1])),
            (e = o.merge(r, {
                method: 'get'
            }, this.defaults, e)).method = e.method.toLowerCase();
            var t = [a, void 0]
                , n = Promise.resolve(e);
            for (this.interceptors.request.forEach((function(e) {
                t.unshift(e.fulfilled, e.rejected);
            }
            )),
            this.interceptors.response.forEach((function(e) {
                t.push(e.fulfilled, e.rejected);
            }
            )); t.length; )
                n = n.then(t.shift(), t.shift());
            return n;
        }
        ,
        o.forEach(['delete', 'get', 'head', 'options'], (function(e) {
            s.prototype[e] = function(t, n) {
                return this.request(o.merge(n || {}, {
                    method: e,
                    url: t
                }));
            };
        }
        )),
        o.forEach(['post', 'put', 'patch'], (function(e) {
            s.prototype[e] = function(t, n, r) {
                return this.request(o.merge(r || {}, {
                    method: e,
                    url: t,
                    data: n
                }));
            };
        }
        )),
        e.exports = s;
    }
    , function(e, t, n) {
        'use strict';
        (function(t) {
            var r = n(26)
                , o = n(31)
                , i = {
                    'Content-Type': 'application/x-www-form-urlencoded'
                };
            function a(e, t) {
                !r.isUndefined(e) && r.isUndefined(e['Content-Type']) && (e['Content-Type'] = t);
            }
            var s, c = {
                adapter: (('undefined' != typeof XMLHttpRequest || void 0 !== t) && (s = n(32)),
                s),
                transformRequest: [function(e, t) {
                    return o(t, 'Content-Type'),
                    r.isFormData(e) || r.isArrayBuffer(e) || r.isBuffer(e) || r.isStream(e) || r.isFile(e) || r.isBlob(e) ? e : r.isArrayBufferView(e) ? e.buffer : r.isURLSearchParams(e) ? (a(t, 'application/x-www-form-urlencoded;charset=utf-8'),
                    e.toString()) : r.isObject(e) ? (a(t, 'application/json;charset=utf-8'),
                    JSON.stringify(e)) : e;
                }
                ],
                transformResponse: [function(e) {
                    if ('string' == typeof e)
                        try {
                            e = JSON.parse(e);
                        } catch (e) {}
                    return e;
                }
                ],
                timeout: 0,
                xsrfCookieName: 'XSRF-TOKEN',
                xsrfHeaderName: 'X-XSRF-TOKEN',
                maxContentLength: -1,
                validateStatus: function(e) {
                    return e >= 200 && e < 300;
                }
            };
            c.headers = {
                common: {
                    Accept: 'application/json, text/plain, */*'
                }
            },
            r.forEach(['delete', 'get', 'head'], (function(e) {
                c.headers[e] = {};
            }
            )),
            r.forEach(['post', 'put', 'patch'], (function(e) {
                c.headers[e] = r.merge(i);
            }
            )),
            e.exports = c;
        }
        ).call(this, n(3));
    }
    , function(e, t, n) {
        'use strict';
        var r = n(26);
        e.exports = function(e, t) {
            r.forEach(e, (function(n, r) {
                r !== t && r.toUpperCase() === t.toUpperCase() && (e[t] = n,
                delete e[r]);
            }
            ));
        };
    }
    , function(e, t, n) {
        'use strict';
        var r = n(26)
            , o = n(33)
            , i = n(36)
            , a = n(37)
            , s = n(38)
            , c = n(34);
        e.exports = function(e) {
            return new Promise((function(t, u) {
                var l = e.data
                    , d = e.headers;
                r.isFormData(l) && delete d['Content-Type'];
                var p = new XMLHttpRequest;
                if (e.auth) {
                    var f = e.auth.username || ''
                        , h = e.auth.password || '';
                    d.Authorization = 'Basic ' + btoa(f + ':' + h);
                }
                if (p.open(e.method.toUpperCase(), i(e.url, e.params, e.paramsSerializer), !0),
                p.timeout = e.timeout,
                p.onreadystatechange = function() {
                    if (p && 4 === p.readyState && (0 !== p.status || p.responseURL && 0 === p.responseURL.indexOf('file:'))) {
                        var n = 'getAllResponseHeaders'in p ? a(p.getAllResponseHeaders()) : null
                            , r = {
                                data: e.responseType && 'text' !== e.responseType ? p.response : p.responseText,
                                status: p.status,
                                statusText: p.statusText,
                                headers: n,
                                config: e,
                                request: p
                            };
                        o(t, u, r),
                        p = null;
                    }
                }
                ,
                p.onerror = function() {
                    u(c('Network Error', e, null, p)),
                    p = null;
                }
                ,
                p.ontimeout = function() {
                    u(c('timeout of ' + e.timeout + 'ms exceeded', e, 'ECONNABORTED', p)),
                    p = null;
                }
                ,
                r.isStandardBrowserEnv()) {
                    var m = n(39)
                        , g = (e.withCredentials || s(e.url)) && e.xsrfCookieName ? m.read(e.xsrfCookieName) : void 0;
                    g && (d[e.xsrfHeaderName] = g);
                }
                if ('setRequestHeader'in p && r.forEach(d, (function(e, t) {
                    void 0 === l && 'content-type' === t.toLowerCase() ? delete d[t] : p.setRequestHeader(t, e);
                }
                )),
                e.withCredentials && (p.withCredentials = !0),
                e.responseType)
                    try {
                        p.responseType = e.responseType;
                    } catch (t) {
                        if ('json' !== e.responseType)
                            throw t;
                    }
                'function' == typeof e.onDownloadProgress && p.addEventListener('progress', e.onDownloadProgress),
                'function' == typeof e.onUploadProgress && p.upload && p.upload.addEventListener('progress', e.onUploadProgress),
                e.cancelToken && e.cancelToken.promise.then((function(e) {
                    p && (p.abort(),
                    u(e),
                    p = null);
                }
                )),
                void 0 === l && (l = null),
                p.send(l);
            }
            ));
        };
    }
    , function(e, t, n) {
        'use strict';
        var r = n(34);
        e.exports = function(e, t, n) {
            var o = n.config.validateStatus;
            n.status && o && !o(n.status) ? t(r('Request failed with status code ' + n.status, n.config, null, n.request, n)) : e(n);
        };
    }
    , function(e, t, n) {
        'use strict';
        var r = n(35);
        e.exports = function(e, t, n, o, i) {
            var a = new Error(e);
            return r(a, t, n, o, i);
        };
    }
    , function(e, t, n) {
        'use strict';
        e.exports = function(e, t, n, r, o) {
            return e.config = t,
            n && (e.code = n),
            e.request = r,
            e.response = o,
            e;
        };
    }
    , function(e, t, n) {
        'use strict';
        var r = n(26);
        function o(e) {
            return encodeURIComponent(e).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
        }
        e.exports = function(e, t, n) {
            if (!t)
                return e;
            var i;
            if (n)
                i = n(t);
            else if (r.isURLSearchParams(t))
                i = t.toString();
            else {
                var a = [];
                r.forEach(t, (function(e, t) {
                    null != e && (r.isArray(e) ? t += '[]' : e = [e],
                    r.forEach(e, (function(e) {
                        r.isDate(e) ? e = e.toISOString() : r.isObject(e) && (e = JSON.stringify(e)),
                        a.push(o(t) + '=' + o(e));
                    }
                    )));
                }
                )),
                i = a.join('&');
            }
            return i && (e += (-1 === e.indexOf('?') ? '?' : '&') + i),
            e;
        };
    }
    , function(e, t, n) {
        'use strict';
        var r = n(26)
            , o = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];
        e.exports = function(e) {
            var t, n, i, a = {};
            return e ? (r.forEach(e.split('\n'), (function(e) {
                if (i = e.indexOf(':'),
                t = r.trim(e.substr(0, i)).toLowerCase(),
                n = r.trim(e.substr(i + 1)),
                t) {
                    if (a[t] && o.indexOf(t) >= 0)
                        return;
                    a[t] = 'set-cookie' === t ? (a[t] ? a[t] : []).concat([n]) : a[t] ? a[t] + ', ' + n : n;
                }
            }
            )),
            a) : a;
        };
    }
    , function(e, t, n) {
        'use strict';
        var r = n(26);
        e.exports = r.isStandardBrowserEnv() ? function() {
            var e, t = /(msie|trident)/i.test(navigator.userAgent), n = document.createElement('a');
            function o(e) {
                var r = e;
                return t && (n.setAttribute('href', r),
                r = n.href),
                n.setAttribute('href', r),
                {
                    href: n.href,
                    protocol: n.protocol ? n.protocol.replace(/:$/, '') : '',
                    host: n.host,
                    search: n.search ? n.search.replace(/^\?/, '') : '',
                    hash: n.hash ? n.hash.replace(/^#/, '') : '',
                    hostname: n.hostname,
                    port: n.port,
                    pathname: '/' === n.pathname.charAt(0) ? n.pathname : '/' + n.pathname
                };
            }
            return e = o(window.location.href),
            function(t) {
                var n = r.isString(t) ? o(t) : t;
                return n.protocol === e.protocol && n.host === e.host;
            };
        }() : function() {
            return !0;
        };
    }
    , function(e, t, n) {
        'use strict';
        var r = n(26);
        e.exports = r.isStandardBrowserEnv() ? {
            write: function(e, t, n, o, i, a) {
                var s = [];
                s.push(e + '=' + encodeURIComponent(t)),
                r.isNumber(n) && s.push('expires=' + new Date(n).toGMTString()),
                r.isString(o) && s.push('path=' + o),
                r.isString(i) && s.push('domain=' + i),
                !0 === a && s.push('secure'),
                document.cookie = s.join('; ');
            },
            read: function(e) {
                var t = document.cookie.match(new RegExp('(^|;\\s*)(' + e + ')=([^;]*)'));
                return t ? decodeURIComponent(t[3]) : null;
            },
            remove: function(e) {
                this.write(e, '', Date.now() - 864e5);
            }
        } : {
            write: function() {},
            read: function() {
                return null;
            },
            remove: function() {}
        };
    }
    , function(e, t, n) {
        'use strict';
        var r = n(26);
        function o() {
            this.handlers = [];
        }
        o.prototype.use = function(e, t) {
            return this.handlers.push({
                fulfilled: e,
                rejected: t
            }),
            this.handlers.length - 1;
        }
        ,
        o.prototype.eject = function(e) {
            this.handlers[e] && (this.handlers[e] = null);
        }
        ,
        o.prototype.forEach = function(e) {
            r.forEach(this.handlers, (function(t) {
                null !== t && e(t);
            }
            ));
        }
        ,
        e.exports = o;
    }
    , function(e, t, n) {
        'use strict';
        var r = n(26)
            , o = n(42)
            , i = n(43)
            , a = n(30)
            , s = n(44)
            , c = n(45);
        function u(e) {
            e.cancelToken && e.cancelToken.throwIfRequested();
        }
        e.exports = function(e) {
            return u(e),
            e.baseURL && !s(e.url) && (e.url = c(e.baseURL, e.url)),
            e.headers = e.headers || {},
            e.data = o(e.data, e.headers, e.transformRequest),
            e.headers = r.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers || {}),
            r.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], (function(t) {
                delete e.headers[t];
            }
            )),
            (e.adapter || a.adapter)(e).then((function(t) {
                return u(e),
                t.data = o(t.data, t.headers, e.transformResponse),
                t;
            }
            ), (function(t) {
                return i(t) || (u(e),
                t && t.response && (t.response.data = o(t.response.data, t.response.headers, e.transformResponse))),
                Promise.reject(t);
            }
            ));
        };
    }
    , function(e, t, n) {
        'use strict';
        var r = n(26);
        e.exports = function(e, t, n) {
            return r.forEach(n, (function(n) {
                e = n(e, t);
            }
            )),
            e;
        };
    }
    , function(e, t, n) {
        'use strict';
        e.exports = function(e) {
            return !(!e || !e.__CANCEL__);
        };
    }
    , function(e, t, n) {
        'use strict';
        e.exports = function(e) {
            return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
        };
    }
    , function(e, t, n) {
        'use strict';
        e.exports = function(e, t) {
            return t ? e.replace(/\/+$/, '') + '/' + t.replace(/^\/+/, '') : e;
        };
    }
    , function(e, t, n) {
        'use strict';
        function r(e) {
            this.message = e;
        }
        r.prototype.toString = function() {
            return 'Cancel' + (this.message ? ': ' + this.message : '');
        }
        ,
        r.prototype.__CANCEL__ = !0,
        e.exports = r;
    }
    , function(e, t, n) {
        'use strict';
        var r = n(46);
        function o(e) {
            if ('function' != typeof e)
                throw new TypeError('executor must be a function.');
            var t;
            this.promise = new Promise((function(e) {
                t = e;
            }
            ));
            var n = this;
            e((function(e) {
                n.reason || (n.reason = new r(e),
                t(n.reason));
            }
            ));
        }
        o.prototype.throwIfRequested = function() {
            if (this.reason)
                throw this.reason;
        }
        ,
        o.source = function() {
            var e;
            return {
                token: new o((function(t) {
                    e = t;
                }
                )),
                cancel: e
            };
        }
        ,
        e.exports = o;
    }
    , function(e, t, n) {
        'use strict';
        e.exports = function(e) {
            return function(t) {
                return e.apply(null, t);
            };
        };
    }
    , function(e, t, n) {
        'use strict';
        var r;
        Object.defineProperty(t, '__esModule', {
            value: !0
        }),
        function(e) {
            e[e.UPLOAD_FAIL = 1] = 'UPLOAD_FAIL';
        }(r || (r = {})),
        t.default = {
            isFile: function(e) {
                return '[object File]' == Object.prototype.toString.call(e);
            },
            isFunction: function(e) {
                return 'function' == typeof e;
            },
            isString: function(e) {
                return 'string' == typeof e;
            },
            noop: function() {},
            delay: function(e) {
                return new Promise((function(t) {
                    setTimeout((function() {
                        t();
                    }
                    ), e);
                }
                ));
            },
            isTest: !1,
            isDev: !1,
            CLIENT_ERROR_CODE: r
        };
    }
    , function(e, t, n) {
        'use strict';
        var r = this && this.__assign || function() {
            return (r = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e;
            }
            ).apply(this, arguments);
        }
        ;
        Object.defineProperty(t, '__esModule', {
            value: !0
        }),
        t.VodReporter = t.VodReportEvent = void 0;
        var o, i, a = n(1), s = n(51), c = n(49);
        !function(e) {
            e.report_apply = 'report_apply',
            e.report_cos_upload = 'report_cos_upload',
            e.report_commit = 'report_commit',
            e.report_done = 'report_done';
        }(o = t.VodReportEvent || (t.VodReportEvent = {})),
        function(e) {
            e[e.apply = 10001] = 'apply',
            e[e.cos_upload = 20001] = 'cos_upload',
            e[e.commit = 10002] = 'commit',
            e[e.done = 40001] = 'done';
        }(i || (i = {}));
        var u = function() {
            function e(e, t) {
                this.baseReportData = {
                    version: s.version,
                    platform: 3e3,
                    device: navigator.userAgent
                },
                this.reportUrl = 'https://vodreport.qcloud.com/ugcupload_new',
                this.uploader = e,
                this.options = t,
                this.init();
            }
            return e.prototype.init = function() {
                this.uploader.on(o.report_apply, this.onApply.bind(this)),
                this.uploader.on(o.report_cos_upload, this.onCosUpload.bind(this)),
                this.uploader.on(o.report_commit, this.onCommit.bind(this)),
                this.uploader.on(o.report_done, this.onDone.bind(this));
            }
            ,
            e.prototype.onApply = function(e) {
                try {
                    var t = this.uploader;
                    if (!t.videoFile)
                        return;
                    Object.assign(this.baseReportData, {
                        appId: t.appId,
                        fileSize: t.videoFile.size,
                        fileName: t.videoFile.name,
                        fileType: t.videoFile.type,
                        vodSessionKey: t.vodSessionKey,
                        reqKey: t.reqKey,
                        reportId: t.reportId
                    });
                    var n = {
                        reqType: i.apply,
                        errCode: 0,
                        vodErrCode: 0,
                        errMsg: '',
                        reqTimeCost: Number(new Date) - Number(e.requestStartTime),
                        reqTime: Number(e.requestStartTime)
                    };
                    e.err && (n.errCode = 1,
                    n.vodErrCode = e.err.code,
                    n.errMsg = e.err.message),
                    e.data && (this.baseReportData.cosRegion = e.data.storageRegionV5),
                    this.report(n);
                } catch (e) {
                    if (console.error('onApply', e),
                    c.default.isTest)
                        throw e;
                }
            }
            ,
            e.prototype.onCosUpload = function(e) {
                try {
                    var t = {
                        reqType: i.cos_upload,
                        errCode: 0,
                        cosErrCode: '',
                        errMsg: '',
                        reqTimeCost: Number(new Date) - Number(e.requestStartTime),
                        reqTime: Number(e.requestStartTime)
                    };
                    e.err && (t.errCode = 1,
                    t.cosErrCode = e.err.error ? e.err.error.Code : e.err,
                    e.err && 'error' === e.err.error && (t.cosErrCode = 'cors error'),
                    t.errMsg = JSON.stringify(e.err)),
                    this.report(t);
                } catch (e) {
                    if (console.error('onCosUpload', e),
                    c.default.isTest)
                        throw e;
                }
            }
            ,
            e.prototype.onCommit = function(e) {
                try {
                    var t = {
                        reqType: i.commit,
                        errCode: 0,
                        vodErrCode: 0,
                        errMsg: '',
                        reqTimeCost: Number(new Date) - Number(e.requestStartTime),
                        reqTime: Number(e.requestStartTime)
                    };
                    e.err && (t.errCode = 1,
                    t.vodErrCode = e.err.code,
                    t.errMsg = e.err.message),
                    e.data && (this.baseReportData.fileId = e.data.fileId),
                    this.report(t);
                } catch (e) {
                    if (console.error('onCommit', e),
                    c.default.isTest)
                        throw e;
                }
            }
            ,
            e.prototype.onDone = function(e) {
                try {
                    var t = {
                        reqType: i.done,
                        errCode: e.err && e.err.code,
                        reqTimeCost: Number(new Date) - Number(e.requestStartTime),
                        reqTime: Number(e.requestStartTime)
                    };
                    this.report(t);
                } catch (e) {
                    if (console.error('onDone', e),
                    c.default.isTest)
                        throw e;
                }
            }
            ,
            e.prototype.report = function(e) {
                e = r(r({}, this.baseReportData), e),
                this.send(e);
            }
            ,
            e.prototype.send = function(e) {
                c.default.isDev || c.default.isTest ? console.log('send reportData', e) : a.vodAxios.post(this.reportUrl, e);
            }
            ,
            e;
        }();
        t.VodReporter = u;
    }
    , function(e) {
        e.exports = JSON.parse('{"name":"vod-js-sdk-v6","version":"1.4.10","description":"tencent cloud vod js sdk v6","main":"lib/src/tc_vod.js","unpkg":"dist/vod-js-sdk-v6.js","typings":"lib/src/tc_vod.d.ts","scripts":{"test":"cross-env NODE_ENV=test mocha -r espower-typescript/guess -r jsdom-global/register -r test/env test/**/*.test.ts","cover":"cross-env NODE_ENV=test nyc mocha -r espower-typescript/guess -r jsdom-global/register -r test/env test/**/*.test.ts","dev":"webpack --config webpack.dev.config.js --watch","dist":"webpack --config webpack.config.js","build":"npm run test && npm run dist && npm run compile","compile":"tsc -p tsconfig.json","prepublish":"npm run build","lint":"tsc --noEmit && eslint \'src/**/*.{js,ts,tsx}\' --quiet --fix"},"repository":{"type":"git","url":"git+https://github.com/tencentyun/vod-js-sdk-v6.git"},"keywords":["tencentcloud","sdk","vod"],"author":"alsotang <alsotang@gmail.com>","license":"MIT","bugs":{"url":"https://github.com/tencentyun/vod-js-sdk-v6/issues"},"homepage":"https://github.com/tencentyun/vod-js-sdk-v6#readme","dependencies":{"axios":"^0.18.0","cos-js-sdk-v5":"0.5.26","js-sha1":"^0.6.0","uuid":"^3.3.2"},"devDependencies":{"@types/mocha":"^5.2.5","@types/semver":"^6.0.0","@types/sha1":"^1.1.1","@types/uuid":"^3.4.4","@typescript-eslint/eslint-plugin":"^1.9.0","@typescript-eslint/parser":"^1.9.0","cross-env":"^6.0.3","eslint":"^5.16.0","eslint-config-prettier":"^4.3.0","eslint-plugin-prettier":"^3.1.0","espower-typescript":"^9.0.1","jsdom":"^13.1.0","jsdom-global":"^3.0.2","mm":"^2.4.1","mocha":"^5.2.0","nyc":"^13.1.0","power-assert":"^1.6.1","prettier":"^1.17.1","semver":"^6.1.1","ts-loader":"^5.3.3","typescript":"^3.5.3","webpack":"^4.28.1","webpack-cli":"^3.2.1"},"nyc":{"extension":[".ts",".tsx"],"include":["src"],"reporter":["html"],"all":true}}');
    }
    , function(e, t, n) {
        var r = n(53)
            , o = n(54);
        e.exports = function(e, t, n) {
            var i = t && n || 0;
            'string' == typeof e && (t = 'binary' === e ? new Array(16) : null,
            e = null);
            var a = (e = e || {}).random || (e.rng || r)();
            if (a[6] = 15 & a[6] | 64,
            a[8] = 63 & a[8] | 128,
            t)
                for (var s = 0; s < 16; ++s)
                    t[i + s] = a[s];
            return t || o(a);
        };
    }
    , function(e, t) {
        var n = 'undefined' != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || 'undefined' != typeof msCrypto && 'function' == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
        if (n) {
            var r = new Uint8Array(16);
            e.exports = function() {
                return n(r),
                r;
            };
        } else {
            var o = new Array(16);
            e.exports = function() {
                for (var e, t = 0; t < 16; t++)
                    0 == (3 & t) && (e = 4294967296 * Math.random()),
                    o[t] = e >>> ((3 & t) << 3) & 255;
                return o;
            };
        }
    }
    , function(e, t) {
        for (var n = [], r = 0; r < 256; ++r)
            n[r] = (r + 256).toString(16).substr(1);
        e.exports = function(e, t) {
            var r = t || 0
                , o = n;
            return [o[e[r++]], o[e[r++]], o[e[r++]], o[e[r++]], '-', o[e[r++]], o[e[r++]], '-', o[e[r++]], o[e[r++]], '-', o[e[r++]], o[e[r++]], '-', o[e[r++]], o[e[r++]], o[e[r++]], o[e[r++]], o[e[r++]], o[e[r++]]].join('');
        };
    }
    ]);
}
));
export default TcVod;
//# sourceMappingURL=vod-js-sdk-v6.js.map
