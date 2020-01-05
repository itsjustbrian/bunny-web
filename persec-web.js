'use strict';
const k = {
		0: 0,
		1: 1,
		2: 2,
		3: 3,
		4: 9,
		5: 10,
		8: 4,
		9: 6,
		10: 7,
		11: 8,
		12: 11,
		13: 12,
		14: 13,
		15: 14
	},
	l = {
		KeyA: 4,
		KeyB: 5,
		KeyC: 6,
		KeyD: 7,
		KeyE: 8,
		KeyF: 9,
		KeyG: 10,
		KeyH: 11,
		KeyI: 12,
		KeyJ: 13,
		KeyK: 14,
		KeyL: 15,
		KeyM: 16,
		KeyN: 17,
		KeyO: 18,
		KeyP: 19,
		KeyQ: 20,
		KeyR: 21,
		KeyS: 22,
		KeyT: 23,
		KeyU: 24,
		KeyV: 25,
		KeyW: 26,
		KeyX: 27,
		KeyY: 28,
		KeyZ: 29,
		Digit1: 30,
		Digit2: 31,
		Digit3: 32,
		Digit4: 33,
		Digit5: 34,
		Digit6: 35,
		Digit7: 36,
		Digit8: 37,
		Digit9: 38,
		Digit0: 39,
		Enter: 40,
		Escape: 41,
		Backspace: 42,
		Tab: 43,
		Space: 44,
		Minus: 45,
		Equal: 46,
		BracketLeft: 47,
		BracketRight: 48,
		Backslash: 49,
		Semicolon: 51,
		Quote: 52,
		Backquote: 53,
		Comma: 54,
		Period: 55,
		Slash: 56,
		CapsLock: 57,
		F1: 58,
		F2: 59,
		F3: 60,
		F4: 61,
		F5: 62,
		F6: 63,
		F7: 64,
		F8: 65,
		F9: 66,
		F10: 67,
		F11: 68,
		F12: 69,
		PrintScreen: 70,
		ScrollLock: 71,
		Pause: 72,
		Insert: 73,
		Home: 74,
		PageUp: 75,
		Delete: 76,
		End: 77,
		PageDown: 78,
		ArrowRight: 79,
		ArrowLeft: 80,
		ArrowDown: 81,
		ArrowUp: 82,
		NumLock: 83,
		NumpadDivide: 84,
		NumpadMultiply: 85,
		NumpadEnter: 86,
		NumpadPlus: 87,
		NumpadMinus: 88,
		Numpad1: 89,
		Numpad2: 90,
		Numpad3: 91,
		Numpad4: 92,
		Numpad5: 93,
		Numpad6: 94,
		Numpad7: 95,
		Numpad8: 96,
		Numpad9: 97,
		Numpad0: 98,
		NumpadPeriod: 99,
		ContextMenu: 101,
		ControlLeft: 224,
		ShiftLeft: 225,
		AltLeft: 226,
		MetaLeft: 227,
		ControlRight: 228,
		ShiftRight: 229,
		AltRight: 230,
		MetaRight: 231
	};
class n
{
	constructor(a, c, d)
	{
		this.g = a;
		this.f = c;
		this.h = d;
		this.b = {};
		this.c = setInterval(() =>
		{
			{
				const f = navigator.getGamepads();
				for (let g = 0; 4 > g; g++)
					if (f[g])
					{
						let h = this.b[g];
						h || (h = this.b[g] = {
							axes: [],
							buttons: []
						});
						for (var b = 0; b < f[g].buttons.length; b++)
						{
							var e = f[g].buttons[b].value;
							void 0 !== h.buttons[b] && h.buttons[b] !== e && this.g(g, b, e);
							h.buttons[b] = e
						}
						for (b = 0; b < f[g].axes.length; b++) e = f[g].axes[b], .05 > Math.abs(e) && (e = 0), void 0 !== h.axes[b] && h.axes[b] !== e && this.f(g, b, e), h.axes[b] = e
					}
				else this.b[g] && (delete this.b[g],
					this.h(g))
			}
		}, 20)
	}
};

function p(a, c, d, b)
{
	d = b ? d.bind(b) : d;
	a.addEventListener(c, d);
	return [a, c, d]
}

function q(a)
{
	for (const c of a) c[0].removeEventListener(c[1], c[2])
};

function r(a)
{
	a.i = new n(a.I.bind(a), a.m.bind(a), a.N.bind(a));
	a.c.push(p(a.b, "resize", a.A, a));
	a.c.push(p(a.b, "mousemove", a.K, a));
	a.c.push(p(a.b, "mousedown", a.s, a));
	a.c.push(p(a.b, "mouseup", a.s, a));
	a.c.push(p(a.b, "mousewheel", a.L, a));
	a.c.push(p(a.b, "contextmenu", a.J, a));
	a.c.push(p(document, "pointerlockchange", a.M, a));
	a.c.push(p(window, "keydown", a.o, a));
	a.c.push(p(window, "keyup", a.o, a));
	a.c.push(p(window, "resize", a.A, a))
}
class t
{
	constructor(a, c, d)
	{
		this.send = d;
		this.l = c;
		this.b = a;
		this.f = this.i = this.h = null;
		this.g = this.j = !1;
		this.c = [];
		this.cache = {};
		this.F = [];
		this.D = 0
	}
	K(a)
	{
		if (this.h || !this.l)
		{
			var c = 0;
			if (document.pointerLockElement)
			{
				c = 1;
				var d = a.movementX;
				a = a.movementY
			}
			else
			{
				if (this.l)
				{
					d = this.h;
					var b = Math.round((a.clientX - d.T) * d.R);
					b === d.v - 1 && (b = d.v);
					b > d.v && (b = d.v);
					0 > b && (b = 0);
					d = b
				}
				else d = a.clientX;
				this.l ? (b = this.h, a = Math.round((a.clientY - b.U) * b.S), a === b.u - 1 && (a = b.u), a > b.u && (a = b.u), 0 > a && (a = 0)) : a = a.clientY
			}
			this.send(
			{
				type: 4,
				C: c,
				x: d,
				y: a
			})
		}
	}
	s(a)
	{
		const c = "mousedown" === a.type;
		let d = 0;
		document.pointerLockElement || this.j && a.target.requestPointerLock();
		if (c && 0 === a.button && a.ctrlKey && a.shiftKey) a.target.requestPointerLock();
		else
		{
			switch (a.button)
			{
			case 0:
				d = 1;
				break;
			case 1:
				d = 2;
				break;
			case 2:
				d = 3;
				break;
			case 3:
				d = 4;
				break;
			case 4:
				d = 5
			}
			this.send(
			{
				type: 2,
				pressed: c,
				button: d
			})
		}
	}
	o(a)
	{
		a.preventDefault();
		if (!("F5" === a.code && a.ctrlKey || "KeyI" === a.code && a.ctrlKey && a.shiftKey || "F11" === a.code))
		{
			var c = l[a.code];
			if (c)
			{
				let d = 0;
				a.getModifierState("NumLock") &&
					(d |= 4096);
				a.getModifierState("CapsLock") && (d |= 8192);
				this.send(
				{
					type: 1,
					B: d,
					pressed: "keydown" === a.type ? 1 : 0,
					code: c
				})
			}
		}
	}
	L(a)
	{
		a.preventDefault();
		this.send(
		{
			type: 3,
			x: -1 * a.deltaX / 100,
			y: -1 * a.deltaY / 100
		})
	}
	J(a)
	{
		a.preventDefault()
	}
	I(a, c, d)
	{
		6 === c || 7 === c ? this.m(a, c - 2, 0 < d ? 32767 * d : 32768 * d) : (c = k[c], void 0 !== c && this.send(
		{
			type: 5,
			button: c,
			id: a,
			pressed: d
		}))
	}
	m(a, c, d)
	{
		this.send(
		{
			type: 6,
			axis: c,
			id: a,
			value: d
		})
	}
	N(a)
	{
		this.send(
		{
			type: 7,
			id: a
		})
	}
	M()
	{
		document.pointerLockElement || this.g || (this.send(
			{
				type: 1,
				code: 41,
				B: 0,
				pressed: 1
			}),
			this.send(
			{
				type: 1,
				code: 41,
				B: 0,
				pressed: 0
			}));
		this.g = !1
	}
	A()
	{
		const a = this.b.offsetWidth,
			c = this.b.offsetHeight,
			d = this.b.videoWidth,
			b = this.b.videoHeight;
		var e = Math.min(a / d, c / b);
		const f = d * e;
		e *= b;
		this.h = {
			R: d / f,
			S: b / e,
			T: Math.max((a - f) / 2, 0),
			U: Math.max((c - e) / 2, 0),
			v: d,
			u: b
		}
	}
};
const u = 1E3 / 60 / 1E3;

function v(a)
{
	a.f = new MediaSource;
	a.b.src = URL.createObjectURL(a.f);
	a.b.load();
	a.g.push(p(a.b, "error", () =>
	{
		console.error(a.b.error.message)
	}, null));
	a.g.push(p(a.f, "sourceopen", () =>
	{
		a.c = a.f.addSourceBuffer(a.type);
		a.c.mode = "sequence";
		a.g.push(p(a.c, "update", a.s, a));
		a.b.play();
		a.i = setInterval(a.A, 1)
	}, null))
}

function w(a)
{
	clearInterval(a.i);
	a.i = null;
	a.m = a.h;
	a.b.pause();
	q(a.g);
	a.g = [];
	a.f && (a.c && (a.f.removeSourceBuffer(a.c), a.c = null), a.f.endOfStream(), URL.revokeObjectURL(a.b.src), a.f = null)
}

function x(a, c)
{
	c = new Uint8Array(c);
	a.h && 102 === c[4] && (w(a), v(a), a.m = !1);
	a.m || (a.l.push(c), a.s())
}
class y
{
	constructor(a, c, d)
	{
		this.b = a;
		this.type = c;
		this.o = d;
		this.f = this.c = null;
		this.m = this.h = 'video/mp4; codecs="avc1.64001e"' === c;
		this.g = [];
		this.l = [];
		this.i = null;
		this.j = 0;
		this.h || v(this);
		this.A = () =>
		{
			var b = this.b.seekable;
			if (b && 0 < b.length)
			{
				b = b.end(0);
				var e = b - this.b.currentTime;
				this.h ? (b = e, this.j = b > 1.5 * u ? this.j + 1 : 0, 60 < this.j && 1 == this.b.playbackRate ? (e = this.b, e.playbackRate = b > 3 * u ? 10 : 1.25, e.play()) : b < u && 1 != this.b.playbackRate && (b = this.b, b.playbackRate = 1, b.play())) : e > .1 * 3 ? this.b.currentTime = b + 1E3 : e > .1 * 1.5 &&
					1 == this.b.playbackRate ? (b = this.b, b.playbackRate = 10, b.play()) : .1 > e && 10 == this.b.playbackRate && (b = this.b, b.playbackRate = 1, b.play())
			}
		}
	}
	s()
	{
		if (0 < this.l.length && this.c && !this.c.updating) try
		{
			const a = this.l.shift();
			this.c.appendBuffer(a)
		}
		catch (a)
		{
			console.warn(a), w(this), this.o && this.o()
		}
	}
};

function z(a, c, d, b, e)
{
	a = new DataView(a);
	a.setInt32(0, d);
	a.setInt32(4, b);
	a.setInt32(8, e);
	a.setInt8(12, c)
}

function A(a, c, d, b)
{
	const e = new ArrayBuffer(13);
	z(e, a, c, d, b);
	return e
}

function B(a, c)
{
	a = JSON.stringify(
	{
		_version: 1,
		_max_w: 6E4,
		_max_h: 6E4,
		_flags: 0,
		resolutionX: a,
		resolutionY: c,
		refreshRate: 60,
		mediaContainer: 2
	});
	c = new ArrayBuffer(13 + a.length + 1);
	z(c, 11, a.length + 1, 0, 0);
	{
		var d = c;
		const b = (new TextEncoder).encode(a);
		d = new Int8Array(d, 13);
		for (let e = 0; e < a.length; e++) d[e] = b[e]
	}
	return a = c
}

function C(a)
{
	switch (a.type)
	{
	case 1:
		return A(0, a.code, a.B, a.pressed);
	case 2:
		return A(1, a.button, a.pressed, 0);
	case 3:
		return A(2, a.x, a.y, 0);
	case 4:
		return A(3, a.C, a.x, a.y);
	case 5:
		return A(4, a.button, a.pressed, a.id);
	case 6:
		return A(5, a.axis, a.value, a.id);
	case 7:
		return A(6, 0, 0, a.id)
	}
}

function D(a)
{
	var c = new DataView(a);
	var d = {
		G: c.getInt32(0),
		H: c.getInt32(4),
		V: c.getInt32(8),
		type: c.getInt8(12)
	};
	switch (d.type)
	{
	case 9:
		a = c.getInt32(16);
		var b = c.getInt16(32);
		c = {
			Z: c.getInt16(20),
			W: c.getInt16(22),
			x: c.getInt16(24),
			y: c.getInt16(26),
			O: c.getInt16(28),
			P: c.getInt16(30),
			C: !!(b & 256),
			hidden: !!(b & 512),
			data: b & 2 ? btoa(String.fromCharCode(...new Uint8Array(c.buffer, 34, a - 1))) : null
		};
		return {
			w: "cursor", ...d, ...c
		};
	case 10:
		return {
			w: "abort", ...d
		};
	case 17:
		return c = d.H, b = d.G, d = new TextDecoder, a = new Int8Array(a,
			13, b), d = d.decode(a),
		{
			w: "user",
			id: c,
			text: d
		};
	case 21:
		return {
			w: "metrics", encode: d.H
		}
	}
	return d
};

function E()
{
	const a = new Uint8Array(16);
	crypto.getRandomValues(a);
	return a.map(c => c % 10).join("")
}

function F(a, c, d, b)
{
	return "v=0\r\n" + `o=- ${E()} 2 IN IP4 127.0.0.1\r\n` + "s=-\r\nt=0 0\r\n" + `a=group:BUNDLE ${b}\r\n` + "a=msid-semantic: WMS *\r\nm=application 9 DTLS/SCTP 5000\r\nc=IN IP4 0.0.0.0\r\nb=AS:30\r\n" + `a=ice-ufrag:${a}\r\n` + `a=ice-pwd:${c}\r\n` + "a=ice-options:trickle\r\n" + `a=fingerprint:${d}\r\n` + "a=setup:active\r\n" + `a=mid:${b}\r\n` + "a=sendrecv\r\na=sctpmap:5000 webrtc-datachannel 256\r\na=max-message-size:1073741823\r\n"
}

function G(a, c, d, b, e)
{
	a.c[d] = a.b.createDataChannel(c,
	{
		negotiated: !0,
		id: d
	});
	a.c[d].binaryType = "arraybuffer";
	a.c[d].onopen = b;
	a.c[d].onmessage = e
}
async function H(a)
{
	a.f = await a.b.createOffer();
	{
		var c = a.f.sdp.split("\n");
		const e = {};
		for (let f = 0; f < c.length; f++)
		{
			var d = c[f].split("="),
				b = d[0];
			d = d[1];
			b && ("a" === b ? (e.a || (e.a = {}), b = d.split(/:(.+)/), e.a[b[0]] = b[1]) : e[b] = d)
		}
		c = e
	}
	a.sdp = c;
	return {
		ice_ufrag: a.sdp.a["ice-ufrag"],
		ice_pwd: a.sdp.a["ice-pwd"],
		fingerprint: a.sdp.a.fingerprint
	}
}
async function I(a, c, d, b, e, f, g, h)
{
	if (!a.h)
	{
		if (!a.f)
		{
			console.error("Offer not set!");
			return
		}
		await a.b.setLocalDescription(a.f);
		try
		{
			const m = F(f, g, h, a.sdp.a.mid);
			await a.b.setRemoteDescription(new RTCSessionDescription(
			{
				type: "answer",
				sdp: m
			}))
		}
		catch (m)
		{
			console.log(m)
		}
		a.h = !0
	}
	b || (await a.b.addIceCandidate(new RTCIceCandidate(
		{
			candidate: `candidate:${2395300328} 1 udp ${2113937151} ${c} ` + `${d} typ ${e?"srflx":"host"} generation 0 ufrag ${f} network-cost 50`,
			sdpMid: a.sdp.a.mid,
			sdpMLineIndex: 0
		})), e && !a.i &&
		(setTimeout(() =>
		{
			a.g("1.2.3.4", 1234, !0, !1, !1)
		}, 100), a.i = !0))
}
class J
{
	constructor(a)
	{
		this.g = a;
		this.h = this.i = !1;
		this.b = this.sdp = null;
		this.c = {};
		this.f = null;
		this.b = new RTCPeerConnection(
		{
			iceServers: [
			{
				urls: "stun:stun.parsec.gg:3478"
			}]
		});
		this.b.onicecandidate = c =>
		{
			c.candidate && (c = c.candidate.candidate.replace("candidate:", "").split(" "), "udp" === c[2].toLowerCase() && this.g(c[4], parseInt(c[5], 10), !1, "srflx" === c[7], "host" === c[7]))
		}
	}
	close()
	{
		for (const a of Object.entries(this.c)) a[1].close();
		this.b.close()
	}
	send(a, c)
	{
		this.c[c].send(a)
	}
};

function K()
{
	const a = [],
		c = new Uint8Array(4);
	for (let d = 0; 6 > d; d++) crypto.getRandomValues(c), a.push(Array.from(c).map(b => b.toString(16).padStart(2, "0")).join(""));
	return a.join("-")
}

function L(a, c, d)
{
	d(c.ip, c.port, c.sync, c.from_stun, a.c.ice_ufrag, a.c.ice_pwd, a.c.fingerprint)
}

function M(a, c, d, b, e)
{
	a.b = new WebSocket(`wss://${"kessel-ws.parsecgaming.com"}:${443}/?session_id=${c}&role=client&version=${1}&sdk_version=${0}`);
	a.h = d;
	a.b.onclose = f =>
	{
		a.l || 1E3 !== f.code || a.f(99)
	};
	a.b.onerror = () =>
	{
		a.f(-6101)
	};
	a.b.onopen = () =>
	{
		var f = {
			action: "offer",
			version: 1,
			payload:
			{
				to: a.h,
				attempt_id: a.j,
				data:
				{
					ver_data: 1,
					creds: b,
					mode: 2,
					versions:
					{
						p2p: 1,
						bud: 1,
						init: 1,
						video: 1,
						audio: 1,
						control: 1
					}
				}
			}
		};
		a.b && a.b.send(JSON.stringify(f))
	};
	a.b.onmessage = f =>
	{
		f = JSON.parse(f.data);
		switch (f.action)
		{
		case "answer_relay":
			a.i = !0;
			f.payload.approved || a.f(8);
			for (a.c = f.payload.data.creds; 0 < a.g.length;) L(a, a.g.shift(), e);
			break;
		case "candex_relay":
			f = f.payload.data, a.i ? L(a, f, e) : a.g.push(f)
		}
	}
}
class N
{
	constructor(a)
	{
		this.f = a;
		this.j = K();
		this.h = "";
		this.b = this.c = null;
		this.g = [];
		this.l = this.i = !1
	}
	close(a)
	{
		this.l = !0;
		this.b && (this.b.close(a), this.b = null)
	}
};
class O
{
	constructor(a, c)
	{
		this.h = c;
		this.c = !1;
		this.b = null;
		this.i = [];
		this.j = document.createElement("audio");
		document.body.appendChild(this.j);
		this.m = new y(this.j, 'audio/mp4; codecs="opus"', null);
		this.l = new y(a, 'video/mp4; codecs="avc1.64001e"', () =>
		{
			this.b.send(A(13, 0, 0, 0), 0)
		});
		this.signal = new N(d =>
		{
			this.g(d)
		});
		this.f = new t(a, !0, d =>
		{
			this.c && this.b.send(C(d), 0)
		});
		this.i.push(p(window, "beforeunload", () =>
		{
			this.g(0);
			return null
		}, null))
	}
	async o(a, c)
	{
		this.b = new J((b, e, f, g, h) =>
		{
			var m = this.signal;
			b = {
				action: "candex",
				version: 1,
				payload:
				{
					to: m.h,
					attempt_id: m.j,
					data:
					{
						ver_data: 1,
						ip: b,
						port: e,
						lan: h,
						from_stun: g,
						sync: f
					}
				}
			};
			m.b && m.b.send(JSON.stringify(b))
		});
		G(this.b, "control", 0, () =>
		{
			this.c = !0;
			this.i.push(p(document, "visibilitychange", () =>
			{
				document.hidden ? (w(this.l), this.b.send(A(19, 0, 0, 0), 0)) : this.b.send(A(13, 0, 0, 0), 0)
			}, null));
			let b = window.screen.width,
				e = window.screen.height;
			if (800 > b || 600 > e || 1920 < b || 1080 < e) b = 1920, e = 1080;
			this.b.send(B(b, e), 0);
			r(this.f);
			this.h(
			{
				type: "connect"
			});
			this.signal.close(1E3)
		}, b =>
		{
			var e = D(b.data);
			switch (e.w)
			{
			case "cursor":
				b = this.f;
				var f = e.C;
				b.b.style.cursor = e.hidden ? "none" : "";
				b.j = f;
				b.j ? b.b.requestPointerLock() : document.pointerLockElement && (b.g = !0, document.exitPointerLock());
				if (e.data)
				{
					b = this.f;
					f = e.data;
					var g = e.O;
					e = e.P;
					if (!b.cache[f])
					{
						b.cache[f] = `cursor-x-${b.D}`;
						const h = document.createElement("style");
						h.type = "text/css";
						h.innerHTML = `.cursor-x-${b.D++} ` + `{cursor: url(data:image/png;base64,${f}) ${g} ${e}, auto;}`;
						document.querySelector("head").appendChild(h);
						b.F.push(h)
					}
					b.f && b.b.classList.remove(b.f);
					b.b.classList.add(b.cache[f]);
					b.f = b.cache[f]
				}
				break;
			case "abort":
				this.g(e.G);
				break;
			case "user":
				this.h(
				{
					type: "userData",
					id: e.id,
					X: e.text
				});
				break;
			case "metrics":
				this.h(
				{
					Y: "metrics",
					...e
				})
			}
		});
		G(this.b, "video", 1, null, b =>
		{
			x(this.l, b.data)
		});
		G(this.b, "audio", 2, null, b =>
		{
			x(this.m, b.data)
		});
		const d = await H(this.b);
		M(this.signal, a, c, d, (b, e, f, g, h, m, P) =>
		{
			I(this.b, b, e, f, g, h, m, P)
		})
	}
	g(a)
	{
		q(this.i);
		this.signal.close(3E3 <= a && 5E3 > a ? a : 1E3);
		w(this.l);
		w(this.m);
		var c = this.f;
		q(c.c);
		c.b.style.cursor = "";
		document.pointerLockElement &&
			(c.g = !0, document.exitPointerLock());
		{
			const d = document.querySelector("head");
			for (const b of c.F) d.removeChild(b);
			c.f && c.b.classList.remove(c.f)
		}
		c.i && clearInterval(c.i.c);
		document.body.removeChild(this.j);
		this.c && (clearInterval(null), this.b.send(A(10, a, 0, 0), 0));
		this.b.close();
		this.c = !1;
		this.h(
		{
			type: "exit",
			code: a
		})
	}
}
O.prototype.destroy = O.prototype.g;
O.prototype.connect = O.prototype.o;
window.__PARSEC_EXPORT = O;
export const Parsec = window.__PARSEC_EXPORT;