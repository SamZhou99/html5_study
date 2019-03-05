module common {
	export class utils {
		// public constructor() {
		// }


		public static GetRandomName(len: number = 6): string {
			let s: string = '';
			let str = 'abcdefghijklmnopqustuvwxyz12345679';
			for (let i = 0; i < len; i++) {
				s += str.substr(Math.random() * str.length, 1);
			}
			return s;
		}


		public static GetFillZero(num: number, len: number = 2): string {
			let zero: string = '00000000000000000000000000000000000000';
			let s: string = String(num);
			let slen: number = s.length;
			if (slen < len) {
				s = zero.substr(0, len - slen) + s;
			}
			return s;
		}



	}
}