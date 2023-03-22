import{_ as k,r as t,o as p,c as u,a,b as s,w as o,F as d,d as n,e as i}from"./app.2fbb9e96.js";var m="/assets/tx-journey.dd6310be.png",h="/assets/tpu-jito-labs.8bb32fb6.png",b="/assets/dropped-via-rpc-pool.8d1ce9af.png",g="/assets/dropped-minority-fork-pre-process.555653e1.png",_="/assets/dropped-minority-fork-post-process.48c3c955.png";const f={},y=a("h1",{id:"mengulang-kembali-transaksi",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#mengulang-kembali-transaksi","aria-hidden":"true"},"#"),n(" Mengulang Kembali Transaksi")],-1),w=n("Pada beberapa kesempatan, transaksi yang terlihat valid mungkin dibatalkan sebelum dimasukkan ke dalam blok. Ini paling sering terjadi saat ada kemacetan jaringan, ketika node RPC gagal melakukan rebroadcast transaksi ke "),P={href:"https://docs.solana.com/terminology#leader",target:"_blank",rel:"noopener noreferrer"},j=n("leader"),v=n(". Bagi end-user, mungkin transaksi mereka tampak seolah-olah hilang sama sekali. Disaat node RPC telah dilengkapi dengan algoritma generic rebroadcasting, pengembang aplikasi juga mampu mengembangkan logika rebroadcasting kustom mereka sendiri."),S=i('<h2 id="fakta" tabindex="-1"><a class="header-anchor" href="#fakta" aria-hidden="true">#</a> Fakta</h2><div class="custom-container tip"><p class="custom-container-title">Lembar Fakta</p><ul><li>Node RPC akan mencoba untuk melakukan rebroadcast ulang transaksi menggunakan algoritma generik</li><li>Pengembang aplikasi dapat menerapkan logika penyiaran ulang kustom mereka sendiri</li><li>Pengembang dapat memanfaatkan parameter <code>maxRetries</code> pada metode JSON-RPC <code>sendTransaction</code></li><li>Pengembang harus mengaktifkan pemeriksaan sebelum broadcast untuk mendeteksi kesalahan sebelum transaksi diajukan</li><li>Sebelum menandatangani ulang transaksi apa pun, <strong>sangat penting</strong> untuk memastikan bahwa blockhash transaksi awal telah kedaluwarsa</li></ul></div><h2 id="perjalanan-dari-sebuah-transaksi" tabindex="-1"><a class="header-anchor" href="#perjalanan-dari-sebuah-transaksi" aria-hidden="true">#</a> Perjalanan dari sebuah Transaksi</h2><h3 id="bagaimana-klien-mengirimkan-transaksi" tabindex="-1"><a class="header-anchor" href="#bagaimana-klien-mengirimkan-transaksi" aria-hidden="true">#</a> Bagaimana Klien Mengirimkan Transaksi</h3><p>Di Solana, tidak ada konsep mempool. Semua transaksi, baik itu dimulai oleh program atau oleh end-user, secara efisien diarahkan ke leader sehingga mereka dapat diproses menjadi block. Ada dua cara utama di mana transaksi dapat dikirim ke leader:</p>',5),T=n("Dengan proxy melalui server RPC dan "),R={href:"https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction",target:"_blank",rel:"noopener noreferrer"},C=n("sendTransaction"),x=n(" metode JSON-RPC"),B=n("Langsung ke leader melalui "),L={href:"https://docs.rs/solana-client/1.7.3/solana_client/tpu_client/index.html",target:"_blank",rel:"noopener noreferrer"},D=n("TPU Client"),K=a("p",null,[n("Sebagian besar end-user akan mengirimkan transaksi melalui server RPC. Ketika klien mengajukan transaksi, node RPC penerima pada gilirannya akan mencoba untuk melakukan broadcast transaksi ke leader saat ini dan berikutnya. Sampai transaksi diproses oleh leader, tidak ada catatan transaksi di luar yang diketahui oleh klien dan node RPC yang mengirimkan. Dalam kasus TPU client, rebroadcast dan leader forwarding ditangani sepenuhnya oleh perangkat lunak klien. "),a("img",{src:m,alt:"Perjalanan Transaksi"})],-1),U=a("h3",{id:"bagaimana-node-rpc-melakukan-broadcast-transaksi",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#bagaimana-node-rpc-melakukan-broadcast-transaksi","aria-hidden":"true"},"#"),n(" Bagaimana Node RPC melakukan broadcast Transaksi")],-1),J=n("Setelah node RPC menerima transaksi melalui "),M=a("code",null,"sendTransaction",-1),V=n(", node tersebut akan mengubah transaksi menjadi paket "),A={href:"https://en.wikipedia.org/wiki/User_Datagram_Protocol",target:"_blank",rel:"noopener noreferrer"},H=n("UDP"),I=n(" sebelum meneruskannya ke leader terkait. UDP memungkinkan validator untuk berkomunikasi dengan cepat satu sama lain, tetapi tidak memberikan jaminan apa pun terkait pengiriman transaksi."),N=n("Karena jadwal leader Solana diketahui sebelum setiap "),F={href:"https://docs.solana.com/terminology#epoch",target:"_blank",rel:"noopener noreferrer"},E=n("epocj"),O=n(" (~2 hari), node RPC akan menyiarkan transaksinya langsung ke pemimpin saat ini dan selanjutnya. Ini berbeda dengan gossip protocol lain seperti Ethereum yang menyebarkan transaksi secara acak dan luas di seluruh jaringan. Secara default, node RPC akan mencoba meneruskan transaksi ke leader setiap dua detik hingga transaksi diselesaikan atau hash block transaksi kedaluwarsa (150 block atau ~ 1 menit 19 detik pada saat penulisan ini). Jika ukuran antrian rebroadcast yang belum diselesaikan lebih besar dari "),z={href:"https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/send-transaction-service/src/send_transaction_service.rs#L20",target:"_blank",rel:"noopener noreferrer"},G=n("10.000 transaksi"),q=n(", transaksi yang baru dikirimkan tidak akan diproses. Ada "),W={href:"https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/validator/src/main.rs#L1172",target:"_blank",rel:"noopener noreferrer"},Y=n("argumen"),Q=n(" command-line yang dapat disesuaikan oleh operator RPC untuk mengubah default behaviour dari logika percobaan ulang ini."),X=n("Saat node RPC melakukan broadcast transaksi, node tersebut akan mencoba meneruskan transaksi ke "),Z={href:"https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/validator.rs#L867",target:"_blank",rel:"noopener noreferrer"},$=n("Transaction Processing Unit (TPU)"),aa=n(" leader . TPU memproses transaksi dalam lima fase berbeda:"),na={href:"https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/fetch_stage.rs#L21",target:"_blank",rel:"noopener noreferrer"},sa=n("Fetch Stage"),ea={href:"https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L91",target:"_blank",rel:"noopener noreferrer"},ta=n("SigVerify Stage"),oa={href:"https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/banking_stage.rs#L249",target:"_blank",rel:"noopener noreferrer"},ia=n("Banking Stage"),ra={href:"https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/poh/src/poh_service.rs",target:"_blank",rel:"noopener noreferrer"},la=n("Proof of History Service"),ca={href:"https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L136",target:"_blank",rel:"noopener noreferrer"},ka=n("Broadcast Stage"),pa=a("p",null,[a("img",{src:h,alt:"Ringkasan TPU"}),a("small",{style:{display:"block","text-align":"center"}},"Gambar Atas Perkenan Jito Labs")],-1),ua=a("p",null,"Dari kelima fase ini, Fetch Stage bertujuan untuk menerima transaksi. Dalam Fetch Stage, validator akan mengkategorikan transaksi yang masuk berdasarkan tiga port berikut:",-1),da={href:"https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L27",target:"_blank",rel:"noopener noreferrer"},ma=n("tpu"),ha=n(" menangani transaksi reguler seperti transfer token, NFT mint, dan instruksi program"),ba={href:"https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L31",target:"_blank",rel:"noopener noreferrer"},ga=n("tpu_vote"),_a=n(" berfokus secara eksklusif pada transaksi pemungutan suara"),fa={href:"https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L29",target:"_blank",rel:"noopener noreferrer"},ya=n("tpu_forwards"),wa=n(" meneruskan paket yang belum diproses ke leader berikutnya jika leader saat ini tidak dapat memproses semua transaksi"),Pa=n("Untuk informasi lebih lanjut tentang TPU, silakan lihat "),ja={href:"https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143",target:"_blank",rel:"noopener noreferrer"},va=n("tulisan luar biasa ini oleh Jito Labs"),Sa=n("."),Ta=a("h2",{id:"bagaimana-transaksi-dapat-dibatalkan",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#bagaimana-transaksi-dapat-dibatalkan","aria-hidden":"true"},"#"),n(" Bagaimana Transaksi dapat dibatalkan")],-1),Ra=a("p",null,"Sepanjang perjalanan transaksi, ada beberapa skenario di mana transaksi dapat secara tidak sengaja dibatalkan dari jaringan.",-1),Ca=a("h3",{id:"sebelum-transaksi-diproses",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#sebelum-transaksi-diproses","aria-hidden":"true"},"#"),n(" Sebelum transaksi diproses")],-1),xa=n("Jika jaringan menghentikan sebuah transaksi, kemungkinan besar jaringan akan melakukannya sebelum transaksi diproses oleh leader. UDP "),Ba={href:"https://en.wikipedia.org/wiki/Packet_loss",target:"_blank",rel:"noopener noreferrer"},La=n("packet loss"),Da=n(" adalah alasan paling sederhana mengapa hal ini dapat terjadi. Selama masa beban jaringan yang intens, validator juga mungkin kewalahan oleh banyaknya transaksi yang perlu diproses. Meskipun validator telah diatur untuk meneruskan surplus transaksi melalui "),Ka=a("code",null,"tpu_forwards",-1),Ua=n(", ada batasan jumlah data yang dapat di"),Ja={href:"https://github.com/solana-labs/solana/blob/master/core/src/banking_stage.rs#L389",target:"_blank",rel:"noopener noreferrer"},Ma=n("forward"),Va=n(". Selanjutnya, tiap forward hanya terbatas pada satu hop antara validator. Artinya, transaksi yang diterima pada port "),Aa=a("code",null,"tpu_forwards",-1),Ha=n(" tidak diteruskan ke validator lain."),Ia=n("Ada juga dua alasan yang kurang diketahui mengapa suatu transaksi dapat dibatalkan sebelum diproses. Skenario pertama melibatkan transaksi yang dikirimkan melalui RPC pool. Kadang-kadang, bagian dari RPC pool bisa ada di depan yang lainnya yang merupakan bagian RPC pool yang sama. Ini dapat menyebabkan masalah ketika node dalam pool yang sama perlu bekerja sama. Dalam contoh ini, "),Na={href:"https://docs.solana.com/developing/programming-model/transactions#recent-blockhash",target:"_blank",rel:"noopener noreferrer"},Fa=n("recentBlockhash"),Ea=n(" dari suatu transaksi diambil dari bagian depan pool (Backend A). Ketika transaksi dikirimkan ke bagian pool yang tertinggal (Backend B), node tidak akan mengenali blockhash tadi dan akan membatalkan transaksi. Ini dapat dideteksi saat pengiriman transaksi jika developer mengaktifkan "),Oa={href:"https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction",target:"_blank",rel:"noopener noreferrer"},za=n("preflight checks"),Ga=n(" di "),qa=a("code",null,"sendTransaction",-1),Wa=n("."),Ya=i('<p><img src="'+b+'" alt="Dropped melalui RPC Pool"></p><p>Percabangan jaringan sementara juga dapat mengakibatkan transaksi dibatalkan. Jika validator lambat untuk memutar ulang bloknya dalam Banking Stage, ia kemudian mungkin akan membuat cabang kecil (minority fork). Saat klien membuat transaksi, transaksi mungkin merujuk ke <code>recentBlockhash</code> yang hanya ada di cabang kecil. Setelah transaksi dikirimkan, cluster kemudian dapat beralih dari cabang kecilnya sebelum transaksi diproses. Dalam skenario ini, transaksi dibatalkan karena blockhash tidak ditemukan.</p><p><img src="'+g+'" alt="Dibatalkan karena Cabang Kecil/Minority Fork (Sebelum Diproses)"></p><h3 id="setelah-transaksi-diproses-dan-sebelum-diselesaikan" tabindex="-1"><a class="header-anchor" href="#setelah-transaksi-diproses-dan-sebelum-diselesaikan" aria-hidden="true">#</a> Setelah transaksi diproses dan sebelum diselesaikan</h3><p>Jika transaksi mereferensikan <code>recentBlockhash</code> dari cabang kecil, transaksi masih mungkin diproses. Dalam hal ini, bagaimanapun, itu akan diproses oleh leader di cabang kecil. Ketika leader ini mencoba untuk membagikan transaksi yang diproses dengan seluruh jaringan, ia akan gagal mencapai kesepakatan dengan mayoritas validator yang tidak mengenali cabang kecil. Pada saat ini, transaksi akan dibatalkan sebelum dapat diselesaikan.</p><p><img src="'+_+'" alt="Dibatalkan karena Cabang Kecil/Minority Fork (Setelah Diproses)"></p><h2 id="menangani-transaksi-yang-dibatalkan" tabindex="-1"><a class="header-anchor" href="#menangani-transaksi-yang-dibatalkan" aria-hidden="true">#</a> Menangani Transaksi yang dibatalkan</h2><p>Meskipun node RPC akan mencoba untuk melakukan rebroadcast transaksi, algoritma yang mereka gunakan bersifat umum dan seringkali tidak cocok untuk kebutuhan aplikasi tertentu. Untuk mempersiapkan apabila terjadi kemacetan jaringan, pengembang aplikasi harus dapat menyesuaikan logika rebroadcast mereka sendiri.</p><h3 id="menelusuri-lebih-dalam-mengenai-sendtransaction" tabindex="-1"><a class="header-anchor" href="#menelusuri-lebih-dalam-mengenai-sendtransaction" aria-hidden="true">#</a> Menelusuri lebih dalam mengenai sendTransaction</h3><p>Dalam hal mengirimkan transaksi, metode RPC <code>sendTransaction</code> adalah alat utama yang tersedia untuk pengembang. <code>sendTransaction</code> hanya bertanggung jawab untuk menyampaikan transaksi dari klien ke node RPC. Jika node menerima transaksi, <code>sendTransaction</code> akan mengembalikan id transaksi yang dapat digunakan untuk melacak transaksi. Respons yang berhasil tidak menunjukkan apakah transaksi akan diproses atau diselesaikan oleh cluster.</p>',10),Qa={class:"custom-container tip"},Xa=a("p",{class:"custom-container-title"},"TIP",-1),Za=a("h4",{id:"request-parameter",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#request-parameter","aria-hidden":"true"},"#"),n(" Request Parameter")],-1),$a=a("li",null,[a("code",null,"transaction"),n(": "),a("code",null,"string"),n(" - Transaksi yang sepenuhnya ditandatangani, sebagai string yang di encode")],-1),an=n("(opsional) "),nn=a("code",null,"configuration object",-1),sn=n(": "),en=a("code",null,"object",-1),tn=a("li",null,[a("code",null,"skipPreflight"),n(": "),a("code",null,"boolean"),n(" - jika true, lewati pemeriksaan preflight dari transaksi (default: false)")],-1),on=n("(opsional) "),rn=a("code",null,"preflightCommitment",-1),ln=n(": "),cn=a("code",null,"string",-1),kn=n(" - "),pn={href:"https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment",target:"_blank",rel:"noopener noreferrer"},un=n("Komitmen"),dn=n(' level yang akan digunakan untuk simulasi preflight terhadap slot bank (default: "finalized").'),mn=a("li",null,[n("(opsional) "),a("code",null,"encoding"),n(": "),a("code",null,"string"),n(' - Encoding yang digunakan untuk data transaksi. Dapat menggunakan "base58" (lambat), atau "base64". (default: "base58").')],-1),hn=a("li",null,[n("(opsional) "),a("code",null,"maxRetries"),n(": "),a("code",null,"usize"),n(" - Jumlah maksimum percobaan node RPC mengirimkan ulang transaksi ke leader. Jika parameter ini tidak disediakan, node RPC akan mencoba kembali transaksi hingga diselesaikan atau hingga blockhash kedaluwarsa.")],-1),bn=a("h4",{id:"response",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#response","aria-hidden":"true"},"#"),n(" Response")],-1),gn=a("code",null,"transaction id",-1),_n=n(": "),fn=a("code",null,"string",-1),yn=n(" - Tanda tangan transaksi pertama yang disematkan dalam transaksi, sebagai string dengan encode base-58. ID transaksi ini dapat digunakan dengan "),wn={href:"https://docs.solana.com/developing/clients/jsonrpc-api#getsignaturestatuses",target:"_blank",rel:"noopener noreferrer"},Pn=n("getSignatureStatuses"),jn=n(" untuk melakukan polling untuk pembaruan status."),vn=a("h2",{id:"menyesuaikan-logika-rebroadcast",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#menyesuaikan-logika-rebroadcast","aria-hidden":"true"},"#"),n(" Menyesuaikan Logika Rebroadcast")],-1),Sn=n("Untuk mengembangkan logika rebroadcast mereka sendiri, pengembang harus memanfaatkan parameter "),Tn=a("code",null,"maxRetries",-1),Rn=n(),Cn=a("code",null,"sendTransaction",-1),xn=n(". Jika disediakan, "),Bn=a("code",null,"maxRetries",-1),Ln=n(" akan menggantikan logika coba ulang default node RPC, yang memungkinkan developer mengontrol proses coba lagi secara manual "),Dn={href:"https://github.com/solana-labs/solana/blob/98707baec2385a4f7114d2167ef6dfb1406f954f/validator/src/main.rs#L1258-L1274",target:"_blank",rel:"noopener noreferrer"},Kn=n("dalam batas yang wajar"),Un=n("."),Jn=n("Pada umumnya, percobaan kembali transaksi secara manual melibatkan penyimpanan "),Mn=a("code",null,"lastValidBlockHeight",-1),Vn=n(" secara sementara yang berasal dari "),An={href:"https://docs.solana.com/developing/clients/jsonrpc-api#getlatestblockhash",target:"_blank",rel:"noopener noreferrer"},Hn=n("getLatestBlockhash"),In=n(". Setelah disimpan, aplikasi kemudian dapat "),Nn={href:"https://docs.solana.com/developing/clients/jsonrpc-api#getblockheight",target:"_blank",rel:"noopener noreferrer"},Fn=n("melakukan polling ketinggian block cluster"),En=n(" dan mencoba kembali transaksi secara manual dengan interval yang sesuai. Pada saat jaringan macet, akan lebih baik jika menyetel "),On=a("code",null,"maxRetries",-1),zn=n(" ke 0 dan melakukan rebroadcast ulang secara manual melalui algoritma khusus. Di saat beberapa aplikasi mungkin menggunakan algoritma "),Gn={href:"https://en.wikipedia.org/wiki/Exponential_backoff",target:"_blank",rel:"noopener noreferrer"},qn=n("exponential backoff"),Wn=n(", yang lain seperti "),Yn={href:"https://www.mango.markets/",target:"_blank",rel:"noopener noreferrer"},Qn=n("Mango"),Xn=n(" memilih untuk "),Zn={href:"https://github.com/blockworks-foundation/mango-ui/blob/b6abfc6c13b71fc17ebbe766f50b8215fa1ec54f/src/utils/send.tsx#L713",target:"_blank",rel:"noopener noreferrer"},$n=n("terus mengirimkan ulang"),as=n(" transaksi pada interval konstan hingga beberapa waktu habis."),ns=a("div",{class:"language-typescript ext-ts line-numbers-mode"},[a("pre",{class:"language-typescript"},[a("code",null,[a("span",{class:"token keyword"},"import"),n(),a("span",{class:"token punctuation"},"{"),n(`
  Keypair`),a("span",{class:"token punctuation"},","),n(`
  Connection`),a("span",{class:"token punctuation"},","),n(`
  `),a("span",{class:"token constant"},"LAMPORTS_PER_SOL"),a("span",{class:"token punctuation"},","),n(`
  SystemProgram`),a("span",{class:"token punctuation"},","),n(`
  Transaction`),a("span",{class:"token punctuation"},","),n(`
`),a("span",{class:"token punctuation"},"}"),n(),a("span",{class:"token keyword"},"from"),n(),a("span",{class:"token string"},'"@solana/web3.js"'),a("span",{class:"token punctuation"},";"),n(`
`),a("span",{class:"token keyword"},"import"),n(),a("span",{class:"token operator"},"*"),n(),a("span",{class:"token keyword"},"as"),n(" nacl "),a("span",{class:"token keyword"},"from"),n(),a("span",{class:"token string"},'"tweetnacl"'),a("span",{class:"token punctuation"},";"),n(`

`),a("span",{class:"token keyword"},"const"),n(),a("span",{class:"token function-variable function"},"sleep"),n(),a("span",{class:"token operator"},"="),n(),a("span",{class:"token keyword"},"async"),n(),a("span",{class:"token punctuation"},"("),n("ms"),a("span",{class:"token operator"},":"),n(),a("span",{class:"token builtin"},"number"),a("span",{class:"token punctuation"},")"),n(),a("span",{class:"token operator"},"=>"),n(),a("span",{class:"token punctuation"},"{"),n(`
  `),a("span",{class:"token keyword"},"return"),n(),a("span",{class:"token keyword"},"new"),n(),a("span",{class:"token class-name"},[a("span",{class:"token builtin"},"Promise")]),a("span",{class:"token punctuation"},"("),a("span",{class:"token punctuation"},"("),n("r"),a("span",{class:"token punctuation"},")"),n(),a("span",{class:"token operator"},"=>"),n(),a("span",{class:"token function"},"setTimeout"),a("span",{class:"token punctuation"},"("),n("r"),a("span",{class:"token punctuation"},","),n(" ms"),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},";"),n(`
`),a("span",{class:"token punctuation"},"}"),a("span",{class:"token punctuation"},";"),n(`

`),a("span",{class:"token punctuation"},"("),a("span",{class:"token keyword"},"async"),n(),a("span",{class:"token punctuation"},"("),a("span",{class:"token punctuation"},")"),n(),a("span",{class:"token operator"},"=>"),n(),a("span",{class:"token punctuation"},"{"),n(`
  `),a("span",{class:"token keyword"},"const"),n(" payer "),a("span",{class:"token operator"},"="),n(" Keypair"),a("span",{class:"token punctuation"},"."),a("span",{class:"token function"},"generate"),a("span",{class:"token punctuation"},"("),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},";"),n(`
  `),a("span",{class:"token keyword"},"const"),n(" toAccount "),a("span",{class:"token operator"},"="),n(" Keypair"),a("span",{class:"token punctuation"},"."),a("span",{class:"token function"},"generate"),a("span",{class:"token punctuation"},"("),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},"."),n("publicKey"),a("span",{class:"token punctuation"},";"),n(`

  `),a("span",{class:"token keyword"},"const"),n(" connection "),a("span",{class:"token operator"},"="),n(),a("span",{class:"token keyword"},"new"),n(),a("span",{class:"token class-name"},"Connection"),a("span",{class:"token punctuation"},"("),a("span",{class:"token string"},'"http://127.0.0.1:8899"'),a("span",{class:"token punctuation"},","),n(),a("span",{class:"token string"},'"confirmed"'),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},";"),n(`

  `),a("span",{class:"token keyword"},"const"),n(" airdropSignature "),a("span",{class:"token operator"},"="),n(),a("span",{class:"token keyword"},"await"),n(" connection"),a("span",{class:"token punctuation"},"."),a("span",{class:"token function"},"requestAirdrop"),a("span",{class:"token punctuation"},"("),n(`
    payer`),a("span",{class:"token punctuation"},"."),n("publicKey"),a("span",{class:"token punctuation"},","),n(`
    `),a("span",{class:"token constant"},"LAMPORTS_PER_SOL"),n(`
  `),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},";"),n(`

  `),a("span",{class:"token keyword"},"await"),n(" connection"),a("span",{class:"token punctuation"},"."),a("span",{class:"token function"},"confirmTransaction"),a("span",{class:"token punctuation"},"("),n("airdropSignature"),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},";"),n(`

  `),a("span",{class:"token keyword"},"const"),n(" blockhashResponse "),a("span",{class:"token operator"},"="),n(),a("span",{class:"token keyword"},"await"),n(" connection"),a("span",{class:"token punctuation"},"."),a("span",{class:"token function"},"getLatestBlockhashAndContext"),a("span",{class:"token punctuation"},"("),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},";"),n(`
  `),a("span",{class:"token keyword"},"const"),n(" lastValidBlockHeight "),a("span",{class:"token operator"},"="),n(" blockhashResponse"),a("span",{class:"token punctuation"},"."),n("context"),a("span",{class:"token punctuation"},"."),n("slot "),a("span",{class:"token operator"},"+"),n(),a("span",{class:"token number"},"150"),a("span",{class:"token punctuation"},";"),n(`

  `),a("span",{class:"token keyword"},"const"),n(" transaction "),a("span",{class:"token operator"},"="),n(),a("span",{class:"token keyword"},"new"),n(),a("span",{class:"token class-name"},"Transaction"),a("span",{class:"token punctuation"},"("),a("span",{class:"token punctuation"},"{"),n(`
    feePayer`),a("span",{class:"token operator"},":"),n(" payer"),a("span",{class:"token punctuation"},"."),n("publicKey"),a("span",{class:"token punctuation"},","),n(`
    blockhash`),a("span",{class:"token operator"},":"),n(" blockhashResponse"),a("span",{class:"token punctuation"},"."),n("value"),a("span",{class:"token punctuation"},"."),n("blockhash"),a("span",{class:"token punctuation"},","),n(`
    lastValidBlockHeight`),a("span",{class:"token operator"},":"),n(" lastValidBlockHeight"),a("span",{class:"token punctuation"},","),n(`
  `),a("span",{class:"token punctuation"},"}"),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},"."),a("span",{class:"token function"},"add"),a("span",{class:"token punctuation"},"("),n(`
    SystemProgram`),a("span",{class:"token punctuation"},"."),a("span",{class:"token function"},"transfer"),a("span",{class:"token punctuation"},"("),a("span",{class:"token punctuation"},"{"),n(`
      fromPubkey`),a("span",{class:"token operator"},":"),n(" payer"),a("span",{class:"token punctuation"},"."),n("publicKey"),a("span",{class:"token punctuation"},","),n(`
      toPubkey`),a("span",{class:"token operator"},":"),n(" toAccount"),a("span",{class:"token punctuation"},","),n(`
      lamports`),a("span",{class:"token operator"},":"),n(),a("span",{class:"token number"},"1000000"),a("span",{class:"token punctuation"},","),n(`
    `),a("span",{class:"token punctuation"},"}"),a("span",{class:"token punctuation"},")"),n(`
  `),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},";"),n(`
  `),a("span",{class:"token keyword"},"const"),n(" message "),a("span",{class:"token operator"},"="),n(" transaction"),a("span",{class:"token punctuation"},"."),a("span",{class:"token function"},"serializeMessage"),a("span",{class:"token punctuation"},"("),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},";"),n(`
  `),a("span",{class:"token keyword"},"const"),n(" signature "),a("span",{class:"token operator"},"="),n(" nacl"),a("span",{class:"token punctuation"},"."),n("sign"),a("span",{class:"token punctuation"},"."),a("span",{class:"token function"},"detached"),a("span",{class:"token punctuation"},"("),n("message"),a("span",{class:"token punctuation"},","),n(" payer"),a("span",{class:"token punctuation"},"."),n("secretKey"),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},";"),n(`
  transaction`),a("span",{class:"token punctuation"},"."),a("span",{class:"token function"},"addSignature"),a("span",{class:"token punctuation"},"("),n("payer"),a("span",{class:"token punctuation"},"."),n("publicKey"),a("span",{class:"token punctuation"},","),n(" Buffer"),a("span",{class:"token punctuation"},"."),a("span",{class:"token function"},"from"),a("span",{class:"token punctuation"},"("),n("signature"),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},";"),n(`
  `),a("span",{class:"token keyword"},"const"),n(" rawTransaction "),a("span",{class:"token operator"},"="),n(" transaction"),a("span",{class:"token punctuation"},"."),a("span",{class:"token function"},"serialize"),a("span",{class:"token punctuation"},"("),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},";"),n(`
  `),a("span",{class:"token keyword"},"let"),n(" blockheight "),a("span",{class:"token operator"},"="),n(),a("span",{class:"token keyword"},"await"),n(" connection"),a("span",{class:"token punctuation"},"."),a("span",{class:"token function"},"getBlockHeight"),a("span",{class:"token punctuation"},"("),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},";"),n(`

  `),a("span",{class:"token keyword"},"while"),n(),a("span",{class:"token punctuation"},"("),n("blockheight "),a("span",{class:"token operator"},"<"),n(" lastValidBlockHeight"),a("span",{class:"token punctuation"},")"),n(),a("span",{class:"token punctuation"},"{"),n(`
    connection`),a("span",{class:"token punctuation"},"."),a("span",{class:"token function"},"sendRawTransaction"),a("span",{class:"token punctuation"},"("),n("rawTransaction"),a("span",{class:"token punctuation"},","),n(),a("span",{class:"token punctuation"},"{"),n(`
      skipPreflight`),a("span",{class:"token operator"},":"),n(),a("span",{class:"token boolean"},"true"),a("span",{class:"token punctuation"},","),n(`
    `),a("span",{class:"token punctuation"},"}"),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},";"),n(`
    `),a("span",{class:"token keyword"},"await"),n(),a("span",{class:"token function"},"sleep"),a("span",{class:"token punctuation"},"("),a("span",{class:"token number"},"500"),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},";"),n(`
    blockheight `),a("span",{class:"token operator"},"="),n(),a("span",{class:"token keyword"},"await"),n(" connection"),a("span",{class:"token punctuation"},"."),a("span",{class:"token function"},"getBlockHeight"),a("span",{class:"token punctuation"},"("),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},";"),n(`
  `),a("span",{class:"token punctuation"},"}"),n(`
`),a("span",{class:"token punctuation"},"}"),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},"("),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},";"),n(`
`)])]),a("div",{class:"line-numbers","aria-hidden":"true"},[a("span",{class:"line-number"},"1"),a("br"),a("span",{class:"line-number"},"2"),a("br"),a("span",{class:"line-number"},"3"),a("br"),a("span",{class:"line-number"},"4"),a("br"),a("span",{class:"line-number"},"5"),a("br"),a("span",{class:"line-number"},"6"),a("br"),a("span",{class:"line-number"},"7"),a("br"),a("span",{class:"line-number"},"8"),a("br"),a("span",{class:"line-number"},"9"),a("br"),a("span",{class:"line-number"},"10"),a("br"),a("span",{class:"line-number"},"11"),a("br"),a("span",{class:"line-number"},"12"),a("br"),a("span",{class:"line-number"},"13"),a("br"),a("span",{class:"line-number"},"14"),a("br"),a("span",{class:"line-number"},"15"),a("br"),a("span",{class:"line-number"},"16"),a("br"),a("span",{class:"line-number"},"17"),a("br"),a("span",{class:"line-number"},"18"),a("br"),a("span",{class:"line-number"},"19"),a("br"),a("span",{class:"line-number"},"20"),a("br"),a("span",{class:"line-number"},"21"),a("br"),a("span",{class:"line-number"},"22"),a("br"),a("span",{class:"line-number"},"23"),a("br"),a("span",{class:"line-number"},"24"),a("br"),a("span",{class:"line-number"},"25"),a("br"),a("span",{class:"line-number"},"26"),a("br"),a("span",{class:"line-number"},"27"),a("br"),a("span",{class:"line-number"},"28"),a("br"),a("span",{class:"line-number"},"29"),a("br"),a("span",{class:"line-number"},"30"),a("br"),a("span",{class:"line-number"},"31"),a("br"),a("span",{class:"line-number"},"32"),a("br"),a("span",{class:"line-number"},"33"),a("br"),a("span",{class:"line-number"},"34"),a("br"),a("span",{class:"line-number"},"35"),a("br"),a("span",{class:"line-number"},"36"),a("br"),a("span",{class:"line-number"},"37"),a("br"),a("span",{class:"line-number"},"38"),a("br"),a("span",{class:"line-number"},"39"),a("br"),a("span",{class:"line-number"},"40"),a("br"),a("span",{class:"line-number"},"41"),a("br"),a("span",{class:"line-number"},"42"),a("br"),a("span",{class:"line-number"},"43"),a("br"),a("span",{class:"line-number"},"44"),a("br"),a("span",{class:"line-number"},"45"),a("br"),a("span",{class:"line-number"},"46"),a("br"),a("span",{class:"line-number"},"47"),a("br"),a("span",{class:"line-number"},"48"),a("br"),a("span",{class:"line-number"},"49"),a("br"),a("span",{class:"line-number"},"50"),a("br"),a("span",{class:"line-number"},"51"),a("br"),a("span",{class:"line-number"},"52"),a("br"),a("span",{class:"line-number"},"53"),a("br"),a("span",{class:"line-number"},"54"),a("br")])],-1),ss=a("div",{class:"language-typescript ext-ts line-numbers-mode"},[a("pre",{class:"language-typescript"},[a("code",null,[a("span",{class:"token keyword"},"while"),n(),a("span",{class:"token punctuation"},"("),n("blockheight "),a("span",{class:"token operator"},"<"),n(" lastValidBlockHeight"),a("span",{class:"token punctuation"},")"),n(),a("span",{class:"token punctuation"},"{"),n(`
  connection`),a("span",{class:"token punctuation"},"."),a("span",{class:"token function"},"sendRawTransaction"),a("span",{class:"token punctuation"},"("),n("rawTransaction"),a("span",{class:"token punctuation"},","),n(),a("span",{class:"token punctuation"},"{"),n(`
    skipPreflight`),a("span",{class:"token operator"},":"),n(),a("span",{class:"token boolean"},"true"),a("span",{class:"token punctuation"},","),n(`
  `),a("span",{class:"token punctuation"},"}"),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},";"),n(`
  `),a("span",{class:"token keyword"},"await"),n(),a("span",{class:"token function"},"sleep"),a("span",{class:"token punctuation"},"("),a("span",{class:"token number"},"500"),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},";"),n(`
  blockheight `),a("span",{class:"token operator"},"="),n(),a("span",{class:"token keyword"},"await"),n(" connection"),a("span",{class:"token punctuation"},"."),a("span",{class:"token function"},"getBlockHeight"),a("span",{class:"token punctuation"},"("),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},";"),n(`
`),a("span",{class:"token punctuation"},"}"),n(`
`)])]),a("div",{class:"line-numbers","aria-hidden":"true"},[a("span",{class:"line-number"},"1"),a("br"),a("span",{class:"line-number"},"2"),a("br"),a("span",{class:"line-number"},"3"),a("br"),a("span",{class:"line-number"},"4"),a("br"),a("span",{class:"line-number"},"5"),a("br"),a("span",{class:"line-number"},"6"),a("br"),a("span",{class:"line-number"},"7"),a("br")])],-1),es=n("Saat melakukan polling melalui "),ts=a("code",null,"getLatestBlockhash",-1),os=n(", aplikasi harus menentukan level "),is={href:"https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment",target:"_blank",rel:"noopener noreferrer"},rs=n("commitment"),ls=n(" yang diinginkan. Dengan menetapkan commitmentnya ke "),cs=a("code",null,"confirmed",-1),ks=n(" (diberi suara) atau "),ps=a("code",null,"finalized",-1),us=n(" (~30 blok setelah "),ds=a("code",null,"confirmed",-1),ms=n("), aplikasi dapat menghindari polling blockhash dari cabang kecil/fork minoritas."),hs=n("Jika aplikasi memiliki akses ke node RPC di belakang load balancer, aplikasi juga dapat memilih untuk membagi beban kerjanya di antara node tertentu. Node RPC yang melayani permintaan data yang intensif seperti "),bs=n("getProgramAccounts"),gs=n(" mungkin cenderung tertinggal dan tidak cocok untuk juga meneruskan transaksi. Untuk aplikasi yang menangani transaksi yang time-sensitive, mungkin lebih bijaksana untuk memiliki node khusus yang hanya menangani "),_s=a("code",null,"sendTransaction",-1),fs=n("."),ys=i('<h3 id="dampak-apabila-melewatkan-preflight" tabindex="-1"><a class="header-anchor" href="#dampak-apabila-melewatkan-preflight" aria-hidden="true">#</a> Dampak apabila Melewatkan Preflight</h3><p>Secara default, <code>sendTransaction</code> akan melakukan tiga pemeriksaan preflight sebelum mengirimkan transaksi. Secara khusus, <code>sendTransaction</code> akan:</p><ul><li>Verifikasi apabila semua tanda tangan valid</li><li>Periksa apakah blockhash yang direferensikan berada dalam 150 blok terakhir</li><li>Simulasikan transaksi terhadap slot bank yang ditentukan oleh <code>preflightCommitment</code></li></ul><p>Jika salah satu dari tiga pemeriksaan preflight ini gagal, <code>sendTransaction</code> akan memunculkan error sebelum mengirimkan transaksi. Pemeriksaan preflight sering kali dapat menjadi perbedaan antara kehilangan transaksi dan memungkinkan klien menangani kesalahan dengan baik. Untuk memastikan bahwa kesalahan umum ini telah diperhitungkan, sebaiknya pengembang tetap mengatur <code>skipPreflight</code> ke <code>false</code>.</p><h3 id="kapan-menandatangani-ulang-re-sign-transaksi" tabindex="-1"><a class="header-anchor" href="#kapan-menandatangani-ulang-re-sign-transaksi" aria-hidden="true">#</a> Kapan Menandatangani Ulang (Re-Sign) Transaksi</h3><p>Terlepas dari semua upaya untuk rebroadcast, mungkin ada saat-saat di mana klien perlu menandatangani ulang (<em>re-sign</em>) transaksi. Sebelum menandatangani ulang transaksi apa pun, <strong>sangat penting</strong> untuk memastikan bahwa blockhash transaksi awal telah kedaluwarsa. Jika blockhash awal masih valid, ada kemungkinan kedua transaksi tersebut diterima oleh jaringan. Bagi end-user, ini akan tampak seolah-olah mereka secara tidak sengaja mengirim transaksi yang sama dua kali.</p>',6),ws=n("Di Solana, transaksi yang dibatalkan dapat dibuang dengan aman setelah blockhash yang dirujuknya lebih lama dari "),Ps=a("code",null,"lastValidBlockHeight",-1),js=n(" yang diterima dari "),vs=a("code",null,"getLatestBlockhash",-1),Ss=n(". Pengembang harus melacak "),Ts=a("code",null,"lastValidBlockHeight",-1),Rs=n(" ini dengan menjalankan "),Cs={href:"https://docs.solana.com/developing/clients/jsonrpc-api#getepochinfo",target:"_blank",rel:"noopener noreferrer"},xs=a("code",null,"getEpochInfo",-1),Bs=n(" dan membandingkan dengan "),Ls=a("code",null,"blockHeight",-1),Ds=n(" dari respons yang diterima. Setelah blockhash tidak valid, klien dapat masuk kembali dengan blockhash yang baru dibuat."),Ks=a("h2",{id:"ucapan-terima-kasih",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#ucapan-terima-kasih","aria-hidden":"true"},"#"),n(" Ucapan Terima Kasih")],-1),Us=n("Terima kasih banyak kepada Trent Nelson, "),Js={href:"https://twitter.com/jacobvcreech",target:"_blank",rel:"noopener noreferrer"},Ms=n("Jacob Creech"),Vs=n(", White Tiger, Le Yafo, "),As={href:"https://twitter.com/buffalu__",target:"_blank",rel:"noopener noreferrer"},Hs=n("Buffalu"),Is=n(", dan "),Ns={href:"https://twitter.com/jito_labs",target:"_blank",rel:"noopener noreferrer"},Fs=n("Jito Labs"),Es=n(" atas ulasan dan umpan balik mereka.");function Os(zs,Gs){const e=t("ExternalLinkIcon"),r=t("SolanaCodeGroupItem"),l=t("SolanaCodeGroup"),c=t("RouterLink");return p(),u(d,null,[y,a("p",null,[w,a("a",P,[j,s(e)]),v]),S,a("ol",null,[a("li",null,[T,a("a",R,[C,s(e)]),x]),a("li",null,[B,a("a",L,[D,s(e)])])]),K,U,a("p",null,[J,M,V,a("a",A,[H,s(e)]),I]),a("p",null,[N,a("a",F,[E,s(e)]),O,a("a",z,[G,s(e)]),q,a("a",W,[Y,s(e)]),Q]),a("p",null,[X,a("a",Z,[$,s(e)]),aa]),a("ul",null,[a("li",null,[a("a",na,[sa,s(e)])]),a("li",null,[a("a",ea,[ta,s(e)])]),a("li",null,[a("a",oa,[ia,s(e)])]),a("li",null,[a("a",ra,[la,s(e)])]),a("li",null,[a("a",ca,[ka,s(e)])])]),pa,ua,a("ul",null,[a("li",null,[a("a",da,[ma,s(e)]),ha]),a("li",null,[a("a",ba,[ga,s(e)]),_a]),a("li",null,[a("a",fa,[ya,s(e)]),wa])]),a("p",null,[Pa,a("a",ja,[va,s(e)]),Sa]),Ta,Ra,Ca,a("p",null,[xa,a("a",Ba,[La,s(e)]),Da,Ka,Ua,a("a",Ja,[Ma,s(e)]),Va,Aa,Ha]),a("p",null,[Ia,a("a",Na,[Fa,s(e)]),Ea,a("a",Oa,[za,s(e)]),Ga,qa,Wa]),Ya,a("div",Qa,[Xa,Za,a("ul",null,[$a,a("li",null,[an,nn,sn,en,a("ul",null,[tn,a("li",null,[on,rn,ln,cn,kn,a("a",pn,[un,s(e)]),dn]),mn,hn])])]),bn,a("ul",null,[a("li",null,[gn,_n,fn,yn,a("a",wn,[Pn,s(e)]),jn])])]),vn,a("p",null,[Sn,Tn,Rn,Cn,xn,Bn,Ln,a("a",Dn,[Kn,s(e)]),Un]),a("p",null,[Jn,Mn,Vn,a("a",An,[Hn,s(e)]),In,a("a",Nn,[Fn,s(e)]),En,On,zn,a("a",Gn,[qn,s(e)]),Wn,a("a",Yn,[Qn,s(e)]),Xn,a("a",Zn,[$n,s(e)]),as]),s(l,null,{default:o(()=>[s(r,{title:"TS",active:""},{default:o(()=>[ns]),preview:o(()=>[ss]),_:1})]),_:1}),a("p",null,[es,ts,os,a("a",is,[rs,s(e)]),ls,cs,ks,ps,us,ds,ms]),a("p",null,[hs,s(c,{to:"/id/guides/get-program-accounts.html"},{default:o(()=>[bs]),_:1}),gs,_s,fs]),ys,a("p",null,[ws,Ps,js,vs,Ss,Ts,Rs,a("a",Cs,[xs,s(e)]),Bs,Ls,Ds]),Ks,a("p",null,[Us,a("a",Js,[Ms,s(e)]),Vs,a("a",As,[Hs,s(e)]),Is,a("a",Ns,[Fs,s(e)]),Es])],64)}var Ws=k(f,[["render",Os]]);export{Ws as default};