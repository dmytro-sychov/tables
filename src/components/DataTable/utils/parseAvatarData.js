export const parseAvatarData = (avatarData) => {
	if (!avatarData) {
		return {
			avatarUrl: null,
			avatarContent: null,
			avatarBgColor: null,
		};
	}

	const [avatarUrlRaw, avatarContent, avatarBgColor] = avatarData.split('___');

	return {
		avatarUrl: avatarUrlRaw === 'NULL' ? null : avatarUrlRaw,
		avatarContent,
		avatarBgColor,
	};
};
