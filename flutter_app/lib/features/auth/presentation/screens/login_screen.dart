import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool _obscurePassword = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Row(
        children: [
          // الجانب الأيمن (نموذج تسجيل الدخول)
          Expanded(
            flex: 1,
            child: Center(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(40.0),
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 400),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Center(
                        child: Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: Theme.of(context).primaryColor.withOpacity(0.1),
                            shape: BoxShape.circle,
                          ),
                          child: Icon(LucideIcons.graduationCap, size: 48, color: Theme.of(context).primaryColor),
                        ),
                      ),
                      const SizedBox(height: 32),
                      Text('مرحباً بك في', style: Theme.of(context).textTheme.bodyLarge),
                      Text('النخبة الجامعية', style: Theme.of(context).textTheme.displayLarge?.copyWith(fontSize: 32)),
                      const SizedBox(height: 8),
                      Text('المنصة السيادية للتعليم العالي والبحث العلمي', style: Theme.of(context).textTheme.bodyMedium),
                      const SizedBox(height: 40),
                      
                      const Text('البريد الإلكتروني المهني', style: TextStyle(fontWeight: FontWeight.bold)),
                      const SizedBox(height: 8),
                      TextFormField(
                        decoration: const InputDecoration(
                          hintText: 'name@elite-univ.dz',
                          prefixIcon: Icon(LucideIcons.mail),
                        ),
                        textDirection: TextDirection.ltr,
                      ),
                      const SizedBox(height: 24),
                      
                      const Text('كلمة المرور', style: TextStyle(fontWeight: FontWeight.bold)),
                      const SizedBox(height: 8),
                      TextFormField(
                        obscureText: _obscurePassword,
                        decoration: InputDecoration(
                          hintText: '••••••••',
                          prefixIcon: const Icon(LucideIcons.lock),
                          suffixIcon: IconButton(
                            icon: Icon(_obscurePassword ? LucideIcons.eyeOff : LucideIcons.eye),
                            onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                          ),
                        ),
                        textDirection: TextDirection.ltr,
                      ),
                      const SizedBox(height: 16),
                      
                      Align(
                        alignment: Alignment.centerLeft,
                        child: TextButton(
                          onPressed: () {},
                          child: const Text('نسيت كلمة المرور؟', style: TextStyle(fontWeight: FontWeight.bold)),
                        ),
                      ),
                      const SizedBox(height: 24),
                      
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton(
                          onPressed: () => context.go('/dashboard'),
                          child: const Text('تسجيل الدخول السيادي'),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
          
          // الجانب الأيسر (الهوية البصرية - يختفي في الشاشات الصغيرة)
          if (MediaQuery.of(context).size.width > 800)
            Expanded(
              flex: 1,
              child: Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Color(0xFF1E3A8A), Color(0xFF3B82F6)],
                    begin: Alignment.topRight,
                    end: Alignment.bottomLeft,
                  ),
                ),
                child: Center(
                  child: Padding(
                    padding: const EdgeInsets.all(40.0),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(LucideIcons.shieldCheck, size: 100, color: Colors.white),
                        const SizedBox(height: 32),
                        const Text(
                          'نظام موثق ومحمي',
                          style: TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 16),
                        Text(
                          'جميع البيانات مشفرة ومحفوظة داخل الخوادم الوطنية للجمهورية الجزائرية الديمقراطية الشعبية لضمان السيادة الرقمية.',
                          textAlign: TextAlign.center,
                          style: TextStyle(color: Colors.white.withOpacity(0.8), fontSize: 16, height: 1.5),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}
