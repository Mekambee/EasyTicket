import { Temporal } from "temporal-polyfill";
import { LineString } from "geojson";

const api_url = (path: string) =>
	new URL(path, process.env.REACT_APP_MAP_API_BASE);
const auth_url = (path: string) =>
	new URL(path, process.env.REACT_APP_MAP_AUTH_BASE);

export enum VehicleType {
	Railway = 100,
	Coach = 200,
	Metro = 400,
	Monorail = 405,
	Bus = 700,
	Trolleybus = 800,
	Tram = 900,
	Water = 1000,
	Air = 1100,
	Ferry = 1200,
	Aerial = 1300,
	Funicular = 1400,
	Taxi = 1500,
	Other = 1700,
}

export async function get_routes(
	system: string,
	from: string,
	to: string,
	mode: RouteSearchMode
): Promise<Route[] | undefined> {
	// UI prototype only:
	// This will definitely be changed to an actual API call when this very
	// real website goes into production.
	if (system !== "Kraków") {
		return undefined;
	}

	if (from === "Ruczaj" && to === "AGH / UR") {
		return [
			{
				start: Temporal.Now.plainDateISO().toZonedDateTime({
					timeZone: Temporal.Now.timeZoneId(),
					plainTime: Temporal.PlainTime.from("12:30"),
				}),
				end: Temporal.Now.plainDateISO().toZonedDateTime({
					timeZone: Temporal.Now.timeZoneId(),
					plainTime: Temporal.PlainTime.from("12:50"),
				}),
				legs: [
					{
						from: { id: "t-stop_289_58929", name: "Ruczaj" },
						to: { id: "t-stop_314_92249", name: "Łagiewniki" },
						lines: [
							{ name: "11", id: "11-Pfpm3WIj5qiR6gkl", type: VehicleType.Tram },
							{ name: "17", id: "17-wLw0AU69xaDyvf0h", type: VehicleType.Tram },
						],
						route: {
							type: "LineString",
							color: "b60000",
							coordinates: [
								[19.906035454749315, 50.0272616095107],
								[19.90686864251316, 50.02760630794879],
								[19.907687831172808, 50.02793548854805],
								[19.908907973495246, 50.028430051788234],
								[19.909796418660022, 50.028787522508395],
								[19.910485032214382, 50.02906727876845],
								[19.91134292619597, 50.0294113726475],
								[19.912137157854147, 50.02973466076557],
								[19.91273319091374, 50.0299800911084],
								[19.91351439886307, 50.03029472939366],
								[19.914213314010027, 50.03057669166833],
								[19.91494509420974, 50.03087616898074],
								[19.915619459186132, 50.03114799165098],
								[19.916023495582124, 50.03130198286135],
								[19.91642516241228, 50.031442638477216],
								[19.916982163209468, 50.03164138282355],
								[19.91772041104477, 50.03189742672677],
								[19.918016863595597, 50.031989696225764],
								[19.91825116924676, 50.03204076159375],
								[19.918440845250245, 50.03206315866805],
								[19.918711943163657, 50.03208307476041],
								[19.91900621990382, 50.03207501181845],
								[19.91924240289339, 50.03204880043293],
								[19.919494839339222, 50.0319986309575],
								[19.920061908606073, 50.0318707171692],
								[19.920609514709952, 50.03173674014636],
								[19.921000024128546, 50.03163998405367],
								[19.92149143849656, 50.03151014730719],
								[19.922048788065695, 50.031365767324985],
								[19.92291981815046, 50.031136565044534],
								[19.923431664425095, 50.031006659363044],
								[19.923991489126024, 50.030889845697146],
								[19.92432760616191, 50.03082982004858],
								[19.924779951274274, 50.030756748095286],
								[19.925227642428695, 50.03069672228037],
								[19.92576274104013, 50.03063478510998],
								[19.92642944034921, 50.03056743453624],
								[19.926874342151734, 50.03052353489366],
								[19.927046437243945, 50.030510478884594],
								[19.927410447809564, 50.0305095829728],
								[19.928193587490227, 50.030510156456955],
								[19.929396718684274, 50.030511052382025],
								[19.929755188590434, 50.03050829061536],
								[19.930032729212655, 50.03049395602514],
								[19.930294928394744, 50.030489476464396],
								[19.930675675076998, 50.03049306011303],
								[19.93143144447501, 50.03049743136006],
								[19.932102699738238, 50.030497237856224],
								[19.932464549323896, 50.030485779310055],
								[19.932802061035147, 50.030449942809355],
								[19.933177476399976, 50.03038146609052],
								[19.933436886228833, 50.03031964797586],
								[19.9337490712729, 50.030221571000936],
								[19.934441310629182, 50.02998039973906],
								[19.935144449158827, 50.029732124675746],
								[19.935431752517275, 50.029647907535434],
								[19.935977368219767, 50.029485381630764],
							],
						},
					},
					{
						from: { id: "a-stop_640_92206", name: "Łagiewniki" },
						to: { id: "a-stop_1626_311101", name: "AGH / UR" },
						lines: [
							{
								name: "A40",
								id: "this line is not in this system",
								type: VehicleType.Bus,
							},
							{
								name: "Kraków-Rabka",
								id: "this line is not in this system",
								type: VehicleType.Bus,
							},
							{
								name: "Kraków-Jordanów",
								id: "this line is not in this system",
								type: VehicleType.Bus,
							},
						],
						route: {
							type: "LineString",
							color: "366df2",
							coordinates: [
								[19.93690643236664, 50.02942713777594],
								[19.936983337984714, 50.02957293875946],
								[19.937005846946164, 50.02973078891131],
								[19.937121841624815, 50.030004914770444],
								[19.937264398379426, 50.030342300743996],
								[19.937480129659065, 50.03078585697034],
								[19.93782546247033, 50.031416183722314],
								[19.938206967580186, 50.032170555719006],
								[19.938649853580188, 50.03295490795492],
								[19.938899232382028, 50.033462861583274],
								[19.9391504945647, 50.03394110389982],
								[19.93928931779709, 50.03419932531284],
								[19.93950502867682, 50.0345210188909],
								[19.939770304923258, 50.03500240218639],
								[19.939904014077257, 50.03531305921831],
								[19.93998709758776, 50.03547552819998],
								[19.940309271371405, 50.03574234896689],
								[19.94057698490508, 50.03595462394992],
								[19.94083913258794, 50.03616817111666],
								[19.940975758805365, 50.03628557367409],
								[19.940975758805365, 50.03645752639605],
								[19.94078550932943, 50.036661856492486],
								[19.940466099388374, 50.036896658905476],
								[19.94002485421413, 50.03723346676779],
								[19.93947257479985, 50.037665010286474],
								[19.93909560916208, 50.037911973717485],
								[19.938395242421876, 50.038451772920496],
								[19.937817657395897, 50.038938771420646],
								[19.937591181567626, 50.039178500899396],
								[19.93728100312856, 50.03954847266647],
								[19.93679435592611, 50.040206452229654],
								[19.936504092594134, 50.040593963889535],
								[19.93610695894165, 50.04114969155688],
								[19.93559192370614, 50.041866400173575],
								[19.935487727215047, 50.04213623996489],
								[19.935306501487105, 50.042525448285005],
								[19.935198005074113, 50.042829741672705],
								[19.935149288480915, 50.04300119148087],
								[19.935157083135692, 50.04317138922539],
								[19.935040101798478, 50.04360216604252],
								[19.9349407197856, 50.043801915621884],
								[19.934864721898663, 50.044149813387776],
								[19.93477181962274, 50.04452221409571],
								[19.93463368308707, 50.04506619575568],
								[19.93447010640449, 50.04569054279534],
								[19.93436611091957, 50.046134751097526],
								[19.934229704278778, 50.04655709283438],
								[19.934097372168736, 50.04690019271837],
								[19.933908351786073, 50.04721428168796],
								[19.9337228309347, 50.047519122606786],
								[19.933520056960134, 50.04783140881591],
								[19.933363456948058, 50.048055623279424],
								[19.93315321734923, 50.04834499657656],
								[19.932922435076506, 50.048657260668875],
								[19.932757104089944, 50.04887495310706],
								[19.932668101617423, 50.0490252401664],
								[19.932549431654706, 50.049201985613706],
								[19.932294946342438, 50.04952859720089],
								[19.932059250047786, 50.04984599799994],
								[19.931861466773825, 50.05006824884691],
								[19.931570072348848, 50.05032731409605],
								[19.931262232146878, 50.050610115139335],
								[19.931010058474556, 50.05086517029679],
								[19.930784508753106, 50.0511409132624],
								[19.930474025390254, 50.05151887234828],
								[19.930131993706368, 50.051956909989656],
								[19.929944099596895, 50.05219608367216],
								[19.929676824115347, 50.05256565726086],
								[19.929463963665626, 50.05285366844615],
								[19.92931892259915, 50.052980661097195],
								[19.92913762126605, 50.053225121004004],
								[19.928842566244924, 50.0536126635875],
								[19.92834571646884, 50.054243629241],
								[19.92787734448376, 50.05484229999928],
								[19.92773323579101, 50.055046521746135],
								[19.927583250142305, 50.055357638925955],
								[19.927387601378314, 50.05577152219078],
								[19.927186822894157, 50.056172713781564],
								[19.9271456180453, 50.05636742224078],
								[19.927011830648865, 50.056647664444654],
								[19.926881623327546, 50.05681909088881],
								[19.92665702288099, 50.05726592436048],
								[19.92638017394458, 50.05776069045788],
								[19.92611521208792, 50.0581735755016],
								[19.925832899066847, 50.0586033763075],
								[19.925537580704997, 50.05903249325959],
								[19.925387595056293, 50.05927692233496],
								[19.92519146671296, 50.0596271496083],
								[19.92497197040592, 50.06000362456817],
								[19.924696603378663, 50.060464340163975],
								[19.92445426345091, 50.060911817377416],
								[19.924194748523945, 50.061407281178106],
								[19.92395339784437, 50.061872533460416],
								[19.923839115519343, 50.062096680585086],
								[19.92376659498612, 50.06236331339312],
								[19.923744146336162, 50.06258761421225],
								[19.92376557285766, 50.062802399669664],
								[19.923834982615205, 50.06303769275863],
								[19.923932226058042, 50.063301146206896],
								[19.92408747850172, 50.063702682389646],
								[19.92416913570105, 50.063970894717556],
								[19.924269747579302, 50.064108605992146],
								[19.924337323530295, 50.064281063799626],
							],
						},
					},
				],
			},
			{
				start: Temporal.Now.plainDateISO().toZonedDateTime({
					timeZone: Temporal.Now.timeZoneId(),
					plainTime: Temporal.PlainTime.from("12:28"),
				}),
				end: Temporal.Now.plainDateISO().toZonedDateTime({
					timeZone: Temporal.Now.timeZoneId(),
					plainTime: Temporal.PlainTime.from("12:54"),
				}),
				legs: [
					{
						from: { id: "t-stop_289_58929", name: "Ruczaj" },
						to: { id: "t-stop_957_333829", name: "Rondo Grunwaldzkie" },
						lines: [
							{ name: "18", id: "18-t7TwVqbAD5gJfyYq", type: VehicleType.Tram },
							{ name: "52", id: "52-z4x5ZXawRrVItheK", type: VehicleType.Tram },
						],
						route: {
							type: "LineString",
							color: "b60000",
							coordinates: [
								[19.906035467104658, 50.027254623565085],
								[19.90755288417631, 50.02787749188806],
								[19.90895480094295, 50.02844169942051],
								[19.90988938165313, 50.02882377317948],
								[19.91225011015206, 50.029777864095394],
								[19.91313987047164, 50.03016223046285],
								[19.915432848529917, 50.031071330937436],
								[19.916039281246555, 50.03130816607748],
								[19.916463065478098, 50.031459572334796],
								[19.91684161431482, 50.03159262592433],
								[19.917778256055357, 50.031915738873124],
								[19.918013343896092, 50.031984937842765],
								[19.91823237844335, 50.03202775925945],
								[19.918418081645967, 50.032062933966074],
								[19.91862997376174, 50.0320797566427],
								[19.91884662749851, 50.0320797566427],
								[19.91902756908013, 50.03206905130352],
								[19.919266669711106, 50.03204144682525],
								[19.919595221532006, 50.031974156029776],
								[19.920648205249393, 50.0317286229521],
								[19.92174067438029, 50.03144416396228],
								[19.9231524622993, 50.031077244852355],
								[19.923892615692637, 50.0309090134493],
								[19.924428298008337, 50.030808074840536],
								[19.924959218704146, 50.03073466480984],
								[19.925360004984185, 50.03067491537948],
								[19.9256195133064, 50.030671856622064],
								[19.925912352972176, 50.03073150235849],
								[19.92609091374331, 50.030824794259246],
								[19.926198050206438, 50.03093949716748],
								[19.926236584175058, 50.03103632263611],
								[19.926255630656726, 50.031213728903936],
								[19.92619738582522, 50.03158375915973],
								[19.926084621313947, 50.032431820562124],
								[19.926075174717937, 50.03254497374806],
								[19.926039462562784, 50.03315822681401],
								[19.926005896140538, 50.03409405959397],
								[19.925959057159332, 50.034827169616904],
								[19.925879045748616, 50.03672415668103],
								[19.92582751617917, 50.03806879140234],
								[19.925806273733258, 50.03839783191722],
								[19.9257610383373, 50.038608851773716],
								[19.92568247159778, 50.0388244580605],
								[19.925590290889204, 50.03902445878592],
								[19.925416491737934, 50.039313460234894],
								[19.925013191826423, 50.039981036869904],
								[19.9248804308192, 50.0401876465001],
								[19.924835195423242, 50.04029162353859],
								[19.92480186407974, 50.040391013144216],
								[19.924744724632433, 50.04048734441193],
								[19.924647111410167, 50.04065859952132],
								[19.92439708981098, 50.04105735205303],
								[19.92433280793341, 50.04112615916591],
								[19.924247098762407, 50.041231663214035],
								[19.924161389592598, 50.041369276841635],
								[19.923990353917503, 50.041654975947125],
								[19.923773700180703, 50.04200512231472],
								[19.92341264705803, 50.042607371313494],
								[19.922936913184287, 50.04337965674867],
								[19.92255125554479, 50.04400508620748],
								[19.922475069614705, 50.044135047134944],
								[19.9223988836857, 50.044300173453365],
								[19.922290476664386, 50.04458331116325],
								[19.92220238668412, 50.04474996486982],
								[19.922073822927615, 50.044967072500754],
								[19.92192063333755, 50.045168635745256],
								[19.921884921183533, 50.04527413090901],
								[19.921892063613825, 50.04538115475137],
								[19.922025476268715, 50.04555854540072],
								[19.922225464333167, 50.04566862641164],
								[19.922506399947565, 50.04576036039447],
								[19.92349535508191, 50.046091191556485],
								[19.92490867888182, 50.046559246519365],
								[19.926264538442638, 50.04700891842978],
								[19.927506829820175, 50.047399647576384],
								[19.92841629935154, 50.0477038869729],
								[19.929630365697534, 50.048105101035674],
								[19.93103318129704, 50.04856064929473],
							],
						},
					},
					{
						from: { id: "a-stop_2108_333804", name: "Rondo Grunwaldzkie" },
						to: { id: "a-stop_1626_311101", name: "AGH / UR" },
						lines: [
							{
								name: "169",
								id: "169-iQWFUMQeW96MtNl_",
								type: VehicleType.Bus,
							},
							{
								name: "179",
								id: "179-1_NhzCIHtrfH6OVz",
								type: VehicleType.Bus,
							},
							{
								name: "301",
								id: "301-X_T-2wc0ihi8LvLT",
								type: VehicleType.Bus,
							},
							{
								name: "503",
								id: "503-BA7VO9l_VBOlu0il",
								type: VehicleType.Bus,
							},
						],
						route: {
							type: "LineString",
							color: "366df2",
							coordinates: [
								[19.932251541159616, 50.049605152086485],
								[19.93204727112814, 50.04985719727944],
								[19.93182680607549, 50.0501059662557],
								[19.931598344251057, 50.050300624578256],
								[19.931295192985175, 50.050537598861666],
								[19.93102497451909, 50.050843723798806],
								[19.930778938708812, 50.05113852757782],
								[19.930464595421086, 50.05154035613896],
								[19.930205379120906, 50.051863366022474],
								[19.929773858344163, 50.052426346238406],
								[19.92947343450055, 50.052835587231755],
								[19.929350416595412, 50.05294278436605],
								[19.929227398690273, 50.053104990100735],
								[19.928721761994666, 50.053767632490406],
								[19.928071018841422, 50.05459987953526],
								[19.92776332368922, 50.055002734940814],
								[19.927682044002296, 50.05513954611459],
								[19.92754804235574, 50.05543714433162],
								[19.92732000054005, 50.055910321453155],
								[19.927210328943346, 50.056143762787485],
								[19.927148819990776, 50.0563651939687],
								[19.927074130548306, 50.056527388134555],
								[19.927002387828622, 50.05665814700279],
								[19.9268969439093, 50.056804826072295],
								[19.926721204044526, 50.05717152178437],
								[19.926363983625635, 50.05780567027557],
								[19.926190440509373, 50.058052479856656],
								[19.925870041818797, 50.0585422454088],
								[19.925472961988902, 50.059129132698786],
								[19.925332369612107, 50.05937186935961],
								[19.92514564600586, 50.05969059566095],
								[19.924871477285535, 50.060157531042904],
								[19.924660589447967, 50.060538303770244],
								[19.924306228549256, 50.06120297267586],
								[19.92398736431153, 50.06180343748966],
								[19.923850716874398, 50.06207697941315],
								[19.923773830683444, 50.06227581981409],
								[19.92375405994912, 50.062515555371846],
								[19.92376214387994, 50.062745474795236],
								[19.923835550998064, 50.06300550652119],
								[19.923927814427458, 50.0632748522913],
								[19.924084104963583, 50.0637108051736],
								[19.924169778147444, 50.06395194372348],
								[19.92427307244833, 50.06409179213637],
								[19.924343368394858, 50.064277932803265],
							],
						},
					},
				],
			},
		];
	} else if (from === "AGH / UR" && to === "Ruczaj") {
		return; //TODO
	} else if (from === "Ruczaj" && to === "Ruczaj") {
		return [
			{
				start: Temporal.Now.zonedDateTimeISO(),
				end: Temporal.Now.zonedDateTimeISO(),
				legs: [
					{
						from: { id: "t-stop_289_58929", name: "Ruczaj" },
						to: { id: "t-stop_289_58929", name: "Ruczaj" },
						lines: [],
						route: { type: "LineString", coordinates: [] },
					},
				],
			},
		];
	} else if (from === "AGH / UR" && to === "AGH / UR") {
		return [
			{
				start: Temporal.Now.zonedDateTimeISO(Temporal.Now.timeZoneId()),
				end: Temporal.Now.zonedDateTimeISO(Temporal.Now.timeZoneId()),
				legs: [
					{
						from: { id: "a-stop_1626_311102", name: "AGH / UR" },
						to: { id: "a-stop_1626_311102", name: "AGH / UR" },
						lines: [],
						route: { type: "LineString", coordinates: [] },
					},
				],
			},
		];
	}

	return undefined;
}

export async function get_all_info(): Promise<BasicSystemInfo[] | undefined> {
	return fetch(api_url(""), {
		priority: "high",
	})
		.then((res) => res.json())
		.catch((err) => {
			console.error(`API error fetching all info: ${err}`);
			return undefined;
		});
}

export async function get_info(
	system: string
): Promise<BasicSystemInfo | undefined> {
	return fetch(api_url(`${system}`), {
		priority: "high",
	})
		.then((res) => res.json())
		.catch((err) => {
			console.error(`API error fetching info: ${err}`);
			return undefined;
		});
}

export async function get_config(
	system: string
): Promise<(SystemConfig & { can_edit: boolean }) | undefined> {
	const token = await get_token();

	const call = (
		token: string | undefined
	): Promise<(SystemConfig & { can_edit: boolean }) | undefined> =>
		fetch(api_url(`${system}/config`), {
			priority: "high",
			headers: token ? { Authorization: `Bearer ${token}` } : {},
			credentials: "include",
		})
			.then((res) => res.json())
			.catch((err) => {
				console.error(`API error fetching config: ${err}`);
				return undefined;
			});

	const res = await call(token);

	if (res !== undefined && (res.can_edit === true || token === undefined)) {
		return res;
	}

	clear_token();
	const new_token = await get_token();

	if (new_token === undefined) {
		return undefined;
	}

	return call(new_token);
}

export async function post_config(
	config: SystemConfig & { name: string }
): Promise<boolean | undefined> {
	const token = await get_token();

	if (token === undefined) {
		return undefined;
	}

	const call = (token: string) =>
		fetch(api_url(`new`), {
			method: "POST",
			body: JSON.stringify(config),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			credentials: "include",
		})
			.then((res) => res.ok)
			.catch((err) => {
				console.error(`API error posting config: ${err}`);
				return undefined;
			});

	const res = await call(token);

	if (res !== false) {
		return res;
	}

	clear_token();
	const new_token = await get_token();

	if (new_token === undefined) {
		return undefined;
	}

	return call(new_token);
}

export async function put_config(
	system: string,
	config: SystemConfig
): Promise<boolean | undefined> {
	const token = await get_token();

	if (token === undefined) {
		return undefined;
	}

	const call = (token: string) =>
		fetch(api_url(`${system}/config`), {
			method: "PUT",
			body: JSON.stringify(config),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			credentials: "include",
		})
			.then((res) => res.ok)
			.catch((err) => {
				console.error(`API error putting config: ${err}`);
				return undefined;
			});

	const res = await call(token);

	if (res !== false) {
		return res;
	}

	clear_token();
	const new_token = await get_token();

	if (new_token === undefined) {
		return undefined;
	}

	return call(new_token);
}

export async function delete_config(
	system: string
): Promise<boolean | undefined> {
	const token = await get_token();

	if (token === undefined) {
		return undefined;
	}

	const call = (token: string) =>
		fetch(api_url(`${system}/config`), {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			credentials: "include",
		})
			.then((res) => res.ok)
			.catch((err) => {
				console.error(`API error deleting config: ${err}`);
				return undefined;
			});

	const res = await call(token);

	if (res !== false) {
		return res;
	}

	clear_token();
	const new_token = await get_token();

	if (new_token === undefined) {
		return undefined;
	}

	return call(new_token);
}

export async function get_alerts(system: string): Promise<Alert[] | undefined> {
	return fetch(api_url(`${system}/alerts`))
		.then((res) => res.json())
		.catch((err) => {
			console.error(`API error fetching alerts: ${err}`);
			return undefined;
		});
}

export async function get_vehicles(
	system: string
): Promise<Vehicle[] | undefined> {
	return fetch(api_url(`${system}/vehicles`))
		.then((res) => res.json())
		.catch((err) => {
			console.error(`API error fetching vehicles: ${err}`);
			return undefined;
		});
}

export async function get_stops(system: string): Promise<Stop[] | undefined> {
	return fetch(api_url(`${system}/stops`))
		.then((res) => res.json())
		.catch((err) => {
			console.error(`API error fetching stops: ${err}`);
			return undefined;
		});
}

export async function get_lines(system: string): Promise<Line[] | undefined> {
	return fetch(api_url(`${system}/lines`))
		.then((res) => res.json())
		.catch((err) => {
			console.error(`API error fetching lines: ${err}`);
			return undefined;
		});
}

export async function get_line(
	system: string,
	line: string
): Promise<Line | undefined> {
	return fetch(api_url(`${system}/line/${line}`))
		.then((res) => res.json())
		.catch((err) => {
			console.error(`API error fetching line: ${err}`);
			return undefined;
		});
}

export async function get_stop(
	system: string,
	stop: string
): Promise<StopSchedule | undefined> {
	return fetch(api_url(`${system}/stop/${stop}`))
		.then((res) => res.json())
		.catch((err) => {
			console.error(`API error fetching stop: ${err}`);
			return undefined;
		});
}

export async function get_shape(
	system: string,
	shape: string
): Promise<LineString | undefined> {
	return fetch(api_url(`${system}/shape/${shape}`), { priority: "low" })
		.then((res) => res.json())
		.catch((err) => {
			console.error(`API error fetching shape: ${err}`);
			return undefined;
		});
}

export async function log_in(credentials: Credentials): Promise<boolean> {
	return fetch(auth_url("login"), {
		method: "POST",
		body: JSON.stringify(credentials),
		credentials: "include",
		headers: { "Content-Type": "application/json" },
	})
		.then((res) => (res.ok ? ((api_token = gen_token()), true) : false))
		.catch((err) => {
			console.error(`API error logging in: ${err}`);
			return false;
		});
}

export async function log_out(): Promise<boolean> {
	clear_token();

	return fetch(auth_url("logout"), {
		method: "POST",
		credentials: "include",
	})
		.then((res) => res.ok)
		.catch((err) => {
			console.error(`API error logging out: ${err}`);
			return false;
		});
}

let api_token: Promise<string | undefined> = Promise.resolve(undefined);

export async function is_logged_in(): Promise<boolean> {
	return (await get_token()) !== undefined;
}

function clear_token() {
	api_token = Promise.resolve(undefined);
}

async function get_token(): Promise<string | undefined> {
	try {
		const token = await api_token;

		if (token !== undefined) {
			return token;
		}

		api_token = gen_token();
		return api_token;
	} catch (e: unknown) {
		return undefined;
	}
}

async function gen_token(): Promise<string | undefined> {
	return fetch(auth_url("gen_token"), {
		method: "POST",
		credentials: "include",
	})
		.then((res) => (res.ok ? res.text() : undefined))
		.catch((err) => {
			console.error(`API error generating API token: ${err}`);
			return undefined;
		});
}

export type LatLon = [number, number];
export type TimeInterval = [null, number] | [number, null] | [number, number];

/** a route between two transit stops */
export type Route = {
	start: Temporal.ZonedDateTime;
	end: Temporal.ZonedDateTime;
	legs: {
		from: { id: string; name: string };
		to: { id: string; name: string };
		route: LineString & {
			color?: string;
		};
		lines: { id: string; name: string; type: VehicleType }[];
	}[];
};

/** how a route between two stops should be searched for */
export type RouteSearchMode = "fastest" | "fewest transfers" | "least walking";

/** basic information about a transit system */
export type BasicSystemInfo = {
	/** the name (and also id) of this transit system */
	name: string;
	/** approximate location of this system as a bounding box */
	location: [LatLon, LatLon];
	/** number of gtfs schedule sources for this system */
	gtfs_sources: number;
	/** number of gtfs realtime sources for this system */
	rt_sources: number;
	/** number of stops in this system, if immediately known */
	stops: number | undefined;
	/** number of lines in this system, if immediately known */
	lines: number | undefined;
};

/** configuration for a transit system */
export type SystemConfig = {
	/** bounding box around (most of) the system, used for initial map position */
	location: [LatLon, LatLon];
	/** gtfs schedule data sources */
	gtfs: {
		[source in string]?: {
			/** unique identifier of this data source within the transit system
			 *
			 * may be left empty if there is either only one gtfs source in
			 * this transit system or all of this transit system's gtfs sources
			 * should be treated as though they were one source (and ids should
			 * always be resolved in all sources, but then ALL source ids in
			 * this transit system must be empty)
			 */
			id: string;
			/** maximum age of the cached data */
			max_age: string;
		};
	};
	/** gtfs realtime data sources */
	realtime: {
		[source in string]?: {
			/** identifier of the gtfs source that ids within this data should be resolved in */
			id: string;
			/** maximum age of the cached data */
			max_age: string;
		};
	};
};

/** an alert */
export type Alert = {
	/** the time during which this alert is active */
	time?: TimeInterval;
	/** brief informational text about this alert */
	info: string;
	/** detailed informational text about this alert */
	details: string;
};

/** a stop */
export type Stop = {
	/** unique identifier of this stop */
	id: string;
	/** user-facing name of this stop */
	name: string;
	/** types of vehicle serving this stop, sorted by prevalence */
	types: VehicleType[];
	/** latitude of this stop */
	lat: number;
	/** longitude of this stop */
	lon: number;
	/** lines that stop at this stop */
	lines: {
		[line in string]?: {
			/** user-facing name of the line */
			name: string;
			/** headsign of the line */
			headsign: string;
			/** type of vehicle used on this line */
			type: VehicleType;
		};
	};
};

/** a vehicle */
export type Vehicle = {
	/** unique identifier of the vehicle */
	id: string;
	/** user-facing name of the vehicle */
	name: string;
	/** type of the vehicle */
	type: VehicleType;
	/** latitude of the vehicle */
	lat: number;
	/** longitude of the vehicle */
	lon: number;
	/** heading/bearing of the vehicle, if known */
	hdg: number | undefined;
	/** line identifier of the vehicle */
	line: string;
	/** user-facing name of the line */
	line_name: string;
	/** headsign of the vehicle/line */
	headsign: string;
	/** the current delay of this vehicle and its uncertainty, if known */
	delay?: [number, number | undefined];
};

/** a transit line */
export type Line = {
	/** unique identifier of the line */
	id: string;
	/** user-facing name of the line */
	name: string;
	/** headsign of the line */
	headsign: string;
	/** the color of this line in rgb hex (without leading '#'), if specified in the source data */
	color: string | undefined;
	/** stops of the line, in service order */
	stops: {
		/** unique identifier of the stop */
		id: string;
		/** user-facing name of the stop */
		name: string;
		/** latitude of the stop */
		lat: number;
		/** longitude of the stop */
		lon: number;
	}[];
	/** vehicle type used on the line */
	type: VehicleType;
	/** identifier(s) of the path(s) of the line */
	shape: string[];
};

/** information about a stop and its schedule */
export type StopSchedule = Stop & {
	/** this stop's schedule */
	schedule: {
		/** dates on which there are additional services */
		additional: string[];
		/** dates on which service may be removed or reduces */
		removed: string[];
		/** times at which lines stop at this stop per weekday */
		schedule: {
			[line in string]?: {
				/** mondays' schedule for this line */
				monday: [string, string][];
				/** tuesdays' schedule for this line */
				tuesday: [string, string][];
				/** wednesdays' schedule for this line */
				wednesday: [string, string][];
				/** thursdays' schedule for this line */
				thursday: [string, string][];
				/** fridays' schedule for this line */
				friday: [string, string][];
				/** saturdays' schedule for this line */
				saturday: [string, string][];
				/** sundays' schedule for this line */
				sunday: [string, string][];
			};
		};
	};
	/** this stop's scheduled arrivals */
	arrivals: {
		/** transit line stopping at this stop */
		line: string;
		/** arrival time */
		arrival: string;
		/** departure time */
		departure: string;
		/** vehicle identifier serving this stop, if known */
		vehicle?: string;
		/** this stop's delay and its uncertainty in seconds, if known */
		delay?: [number, number | undefined];
	}[];
};

export type Credentials = {
	email: string;
	password: string;
};
