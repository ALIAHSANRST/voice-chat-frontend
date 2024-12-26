const JPY = {
  SIGN_IN: {
    TITLE: 'サインイン',
    WELCOME_BACK: 'おかえりなさい',
    DESCRIPTION: 'メールアドレスとパスワードを入力してサインインしてください',
    EMAIL: 'メールアドレス',
    EMAIL_PLACEHOLDER: 'メールアドレスを入力',
    PASSWORD: 'パスワード',
    PASSWORD_PLACEHOLDER: 'パスワードを入力',
    FORGOT_PASSWORD: 'パスワードをお忘れですか？',
    LOGIN: 'ログイン',
    NOT_REGISTERED_YET: 'アカウントをお持ちでない方',
    CREATE_AN_ACCOUNT: 'アカウントを作成',
  },
  SIGN_UP: {
    TITLE: 'サインアップ',
    WELCOME_TO_SIGN_UP: 'アカウント作成',
    DESCRIPTION: '以下の情報を入力するか、ソーシャルメディアアカウントで続行してください',
    FULL_NAME: '氏名',
    FULL_NAME_PLACEHOLDER: '氏名を入力',
    EMAIL: 'メールアドレス',
    EMAIL_PLACEHOLDER: 'メールアドレスを入力',
    PASSWORD: 'パスワード',
    PASSWORD_PLACEHOLDER: 'パスワードを入力',
    SIGN_UP: 'サインアップ',
    ALREADY_HAVE_AN_ACCOUNT: 'すでにアカウントをお持ちの方',
    LOGIN_NOW: '今すぐログイン',
  },
  LOGOUT: {
    TITLE: 'ログアウト',
  },
  LINE_AUTH_RESPONSE: {
    TITLE: 'LINE認証レスポンス',
    MESSAGE: 'LINEでログイン中...',
  },
  GOOGLE_AUTH_RESPONSE: {
    TITLE: 'Google認証レスポンス',
    MESSAGE: 'Googleでログイン中...',
  },
  FORGOT_PASSWORD: {
    TITLE: 'パスワードをお忘れの方',
    EMAIL_SENT: 'メール送信完了',
    HEADING_1: 'メールを送信しました！',
    DESCRIPTION_1: 'パスワードリセット確認のメールを送信しました。リンクの有効期限は5分間です。',
    HEADING_2: 'パスワードをお忘れですか？',
    DESCRIPTION_2: 'ご心配なく。リセット手順をメールでお送りします',
    EMAIL: 'メールアドレス',
    EMAIL_PLACEHOLDER: 'メールアドレスを入力',
    SEND_EMAIL: 'メールを送信',
  },
  GO_BACK: {
    TEXT: 'ログインに戻る',
  },
  RESET_PASSWORD: {
    TITLE: 'パスワードリセット',
    HEADING: 'パスワードリセット',
    DESCRIPTION: '新しいパスワードを入力してください',
    PASSWORD: 'パスワード',
    PASSWORD_PLACEHOLDER: 'パスワードを入力',
    CONFIRM_PASSWORD: 'パスワード（確認）',
    CONFIRM_PASSWORD_PLACEHOLDER: 'パスワードを再入力',
    RESET_PASSWORD: 'パスワードをリセット',
  },
  USER_HOME: {
    TITLE: 'ユーザーホーム',
    WELCOME: '👋 こんにちは、{fullname}さん',
    WELCOME_MESSAGE: 'Globalie Educationへようこそ！',
    DELETING_ACCOUNT: 'アカウントを削除中...',
    TEXT_1: '今すぐ無料で試験を受けましょう！',
    TEXT_2: '知識をテストして即座に結果を確認 — 費用も義務もありません！',
    TAKE_FREE_EXAM: '無料試験を受ける',
    JOIN_AS_STUDENT: '生徒として参加',
    MY_TUTORS: '担当講師',
    TEXT_3: 'まだ誰にも連絡していないようです。始めましょう！',
    GETTING_STARTED_GUIDE: 'スタートガイド',
    FOLLOW_THESE_STEPS: '以下の簡単な手順に従ってください',
    STEPS: [
      '組織を作成または参加',
      '指示をよく読む',
      '「試験開始」をクリックして開始',
      'スコアを確認してフィードバックを提供',
      'Globalieをどこで知ったか回答する'
    ]
  },
  GIVE_FEEDBACK: {
    TITLE: 'フィードバック',
    HEADING: 'フィードバックをお願いします！',
    DESCRIPTION: 'サービス向上のため、あなたの体験をお聞かせください。',
    Q1_TEXT: '体験はいかがでしたか？',
    Q1_DESCRIPTION: 'コースの満足度を1から5の段階で評価してください。',
    Q2_TEXT: 'ご意見をお聞かせください',
    Q2_DESCRIPTION: 'サービス向上のため、詳細なフィードバックをお願いします。',
    Q2_PLACEHOLDER: 'フィードバックを入力してください...',
    SUBMIT_FEEDBACK: 'フィードバックを送信'
  },
  EXAM_HISTORY: {
    TITLE: '試験履歴',
    HEADING: '履歴',
    DESCRIPTION: '過去の活動と成績の記録を確認できます。',
    DATE: '日付',
    TIME: '時間',
    SCORE: 'スコア',
    NO_RECORDS_FOUND: '記録が見つかりません！',
    PREV: '前へ',
    NEXT: '次へ'
  },
  FREE_EXAM: {
    TITLE: '無料試験',
    HEADING: 'リーディング評価',
    DESCRIPTION: '段落を注意深く読み、理解力と速度に基づいてスコアを取得します。',
    TEXT_1: '試験問題が見つかりません！',
    TEXT_2: '後でもう一度お試しいただくか、サポートまでご連絡ください。',
    START_READING: '読み始める',
    END_READING: '読み終わる',
    CALCULATING_SCORE: 'スコア計算中...',
    MODAL: {
      TITLE: '試験の準備をしましょう',
      SUBTITLE: '試験を成功させるために以下の手順に従ってください。',
      DOTS: [
        {
          title: '音声ガイダンス',
          subtitle: 'マイクに向かって段落を音読します。最良の結果を得るため、静かな環境で行ってください。'
        },
        {
          title: '読み方の指示',
          subtitle: '準備ができたら、マイクに向かって段落を読み始めてください。はっきりと読むよう心がけてください。'
        },
        {
          title: '試験開始',
          subtitle: '準備ができたら「読み始める」ボタンをクリックして開始してください。'
        },
        {
          title: '試験終了',
          subtitle: 'すべての段落を読み終えたら、「試験終了」をクリックして終了します。'
        }
      ],
      CHECKBOX_LABEL: '指示を理解し、試験を開始する準備ができました。',
      CONTINUE_BUTTON: '続ける',
      CHECKBOX_ERROR: '続行するには利用規約に同意してください。'
    },
    SIGN_IN_MODAL: {
      TITLE: 'テストを開始するにはログインしてください',
      DESCRIPTION: 'メールアドレスとパスワードを入力してサインインしてください',
      EMAIL: 'メールアドレス',
      EMAIL_PLACEHOLDER: 'メールアドレスを入力',
      PASSWORD: 'パスワード',
      PASSWORD_PLACEHOLDER: 'パスワードを入力',
      FORGOT_PASSWORD: 'パスワードをお忘れですか？',
      LOGIN: 'ログイン',
      NOT_REGISTERED_YET: 'アカウントをお持ちでない方',
      CREATE_AN_ACCOUNT: 'アカウントを作成',
    },
    RESULT: {
      NO_FEEDBACK: 'フィードバックはありません！',
      NO_SUGGESTION: '提案はありません！',
      TEXT_1: '試験完了おめでとうございます！',
      TEXT_2: 'あなたの成績とフィードバックを確認してください。',
      TEXT_3: 'あなたの読みの評価結果です。',
      TEXT_4: 'スコアは発音、明瞭さ、流暢さに基づいて判定されます！',
      TEXT_5: '詳細なフィードバック',
      TEXT_6: '提案',
      TEXT_7: '試験履歴',
      TEXT_8: 'ホームに戻る',
    }
  },
  HOME_PAGE: {
    TITLE: 'ホーム',
    NAV: ['ホーム', '選ばれる理由', '利用方法', '体験談', 'よくある質問'],
    REGISTER_NOW: '今すぐ登録',
    TAGLINE: ['+1', 'グローバルな専門家と学び、つながる'],
    HERO_SECTION: [
      'Globalieでスキルを習得',
      '学生や専門家のためのAI駆動の試験と専門家による指導。',
      '今すぐ試験を受ける',
    ],
    WHY_CHOOSE_SECTION: [
      'なぜMasters in Meを選ぶのか？',
      'あなたのスキル、興味、目標に合った機会の世界を解き放ちましょう',
      '経験豊富な講師陣',
      'プロジェクトを披露して他の人々の中で際立つ',
      '講師をリクエスト',
      '100K+',
      '世界中のアクティブユーザー',
      'カスタマイズされた試験',
      '柔軟なスケジュール',
      '好きな時に、好きな場所で、好みの講師と学習',
      '講師をリクエスト',
    ],
    HOW_IT_WORKS_SECTION: {
      TITLE: '利用方法',
      STEPS: [
        {
          stepNumber: '01',
          stepTitle: '登録と認証',
          stepDescription: '簡単に登録してアカウントを保護し、学習を始めましょう。',
        },
        {
          stepNumber: '02',
          stepTitle: '試験を受ける',
          stepDescription: 'オンライン試験を完了し、詳細な個別フィードバックを受け取ります。',
        },
        {
          stepNumber: '03',
          stepTitle: 'レッスンのスケジュール',
          stepDescription: '都合の良い時間に経験豊富な講師とセッションを予約します。',
        },
      ],
      TEXT_1: '10K+',
      TEXT_2: '講師',
    },
    TESTIMONIAL_SECTION: {
      TITLE: 'お客様の声',
    },
    FAQ_SECTION: {
      TITLE: 'よくある質問',
      QUESTIONS: [
        {
          questionNumber: '01',
          questionTitle: 'ジョブボードでアカウントを作成するにはどうすればよいですか？',
          questionDescription: 'ホームページの検索バーを使用して、スキル、職種、希望の場所に関連するキーワードを入力してください。また、業界、雇用形態（正社員、パートタイム、フリーランス）、経験レベルで結果を絞り込むための詳細検索フィルターも使用できます。',
        },
        {
          questionNumber: '02',
          questionTitle: 'プラットフォームを通じて求人に応募するにはどうすればよいですか？',
          questionDescription: '興味のある求人を見つけたら、求人情報をクリックして詳細を確認してください。求人がまだ募集中の場合、「応募」ボタンをクリックしてプラットフォームから直接応募できます。まだアカウントを作成していない場合は、アカウントの作成またはログインが必要になる場合があります。指示に従って応募を完了してください。',
        },
        {
          questionNumber: '03',
          questionTitle: '求人応募の状況を追跡するにはどうすればよいですか？',
          questionDescription: '応募後、アカウントにログインして応募状況を確認できます。ダッシュボードまたはプロフィール設定で「応募状況」セクションを探してください。ここで、「保留中」、「選考中」、「不採用」などの現在の応募状況を確認できます。質問がある場合や詳細情報が必要な場合は、プラットフォームを通じて雇用主に直接連絡することができます。',
        },
        {
          questionNumber: '04',
          questionTitle: 'ジョブボードでアカウントを作成するにはどうすればよいですか？',
          questionDescription: 'ホームページの検索バーを使用して、スキル、職種、希望の場所に関連するキーワードを入力してください。また、業界、雇用形態（正社員、パートタイム、フリーランス）、経験レベルで結果を絞り込むための詳細検索フィルターも使用できます。',
        },
        {
          questionNumber: '05',
          questionTitle: 'ジョブボードの利用には費用がかかりますか？また、無料の機能は何ですか？',
          questionDescription: 'ジョブボードの利用は無料で、費用なしで求人の閲覧や応募ができます。ただし、求人の保存や通知の受信などの一部の機能は、サブスクリプションまたはプレミアムアカウントが必要になる場合があります。利用可能な機能とその関連コストについては、常にプラットフォームの料金ページを参照してください。',
        }
      ]
    },
    JOIN_US_SECTION: {
      TITLE: '意欲的な専門家と共に、今日から夢のキャリアを解き放ちましょう',
      DESCRIPTION: 'あなたのスキル、興味、目標に合った機会の世界を解き放ちましょう',
      EMAIL_PLACEHOLDER: 'メールアドレスを入力',
      JOIN_US: '参加する',
    },
    FOOTER_SECTION: {
      QUICK_LINKS_TITLE: 'クイックリンク',
      QUICK_LINKS: ['ホーム', '求人', '雇用主', 'キャリア', 'お問い合わせ'],
      OTHERS_TITLE: 'その他',
      OTHERS: ['利用規約', 'プライバシーポリシー'],
      COPYRIGHT: '全著作権所有',
    }
  }
};

export default JPY;