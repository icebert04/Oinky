// import { useWorkspace } from '@/composables'
// import { Oink } from '@/models'
// import bs58 from 'bs58'
export const fetchOinks = async () => {
return [{
        argument: 'looksrare',
        content: 'No, @LooksRareNFT is the Best!',
        author_display: 'y2ip..Mfjp',
        created_at: 'Nov 26, 2022 10:20PM',
        created_ago: 'just now',
        timestamp: 1637932864,
    },
    {
        argument: 'opensea',
        content: '@opensea is the best NFT marketplace on the Blockchain space!',
        author_display: '6RDu..sB4v',
        created_at: 'Nov 26, 2022 10:14PM',
        created_ago: '6 min ago',
        timestamp: 1637932864,
    },
]
}

// export const fetchOinks = async (filters = []) => {
//     const { program } = useWorkspace()
//     const oinks = await program.value.account.oink.all(filters);
//     return oinks.map(oink => new Oink(oink.publicKey, oink.account))
// }

// export const authorFilter = authorBase58PublicKey => ({
//     memcmp: {
//         offset: 8, // Discriminator.
//         bytes: authorBase58PublicKey,
//     }
// })

// export const argumentFilter = argument => ({
//     memcmp: {
//         offset: 8 + // Discriminator.
//             32 + // Author public key.
//             8 + // Timestamp.
//             4, // Argument string prefix.
//         bytes: bs58.encode(Buffer.from(argument)),
//     }
// })
