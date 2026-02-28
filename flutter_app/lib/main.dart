import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'core/routing/app_router.dart';
import 'core/theme/app_theme.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const ProviderScope(child: EliteUnivApp()));
}

class EliteUnivApp extends ConsumerWidget {
  const EliteUnivApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(appRouterProvider);

    return MaterialApp.router(
      title: 'Elite Univ - النخبة الجامعية',
      debugShowCheckedModeBanner: false,
      
      // التوجيه المتقدم
      routerConfig: router,
      
      // الهوية البصرية السيادية
      theme: AppTheme.lightTheme,
      
      // دعم اللغات (عربي، فرنسي، إنجليزي)
      supportedLocales: const [
        Locale('ar', 'DZ'),
        Locale('fr', 'FR'),
        Locale('en', 'US'),
      ],
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      locale: const Locale('ar', 'DZ'), // اللغة الافتراضية
      
      // فرض اتجاه النص من اليمين لليسار لكامل التطبيق
      builder: (context, child) {
        return Directionality(
          textDirection: TextDirection.rtl,
          child: child!,
        );
      },
    );
  }
}
