import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';

class DashboardLayout extends StatefulWidget {
  const DashboardLayout({super.key});

  @override
  State<DashboardLayout> createState() => _DashboardLayoutState();
}

class _DashboardLayoutState extends State<DashboardLayout> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    final isDesktop = MediaQuery.of(context).size.width > 800;

    return Scaffold(
      appBar: AppBar(
        title: const Text('لوحة القيادة'),
        actions: [
          IconButton(icon: const Icon(LucideIcons.bell), onPressed: () {}),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: InkWell(
              onTap: () => context.go('/dashboard/profile'),
              child: const CircleAvatar(
                backgroundColor: Color(0xFFD97706),
                child: Text('M', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
              ),
            ),
          ),
        ],
      ),
      drawer: isDesktop ? null : _buildDrawer(context),
      body: Row(
        children: [
          if (isDesktop) SizedBox(width: 260, child: _buildDrawer(context)),
          Expanded(
            child: _buildBodyContent(),
          ),
        ],
      ),
      bottomNavigationBar: isDesktop ? null : BottomNavigationBar(
        currentIndex: _currentIndex,
        selectedItemColor: Theme.of(context).primaryColor,
        unselectedItemColor: Colors.grey,
        onTap: (index) => setState(() => _currentIndex = index),
        items: const [
          BottomNavigationBarItem(icon: Icon(LucideIcons.layoutDashboard), label: 'الرئيسية'),
          BottomNavigationBarItem(icon: Icon(LucideIcons.bookOpen), label: 'المحتوى'),
          BottomNavigationBarItem(icon: Icon(LucideIcons.users), label: 'الطلاب'),
        ],
      ),
    );
  }

  Widget _buildBodyContent() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(LucideIcons.layoutDashboard, size: 64, color: Theme.of(context).primaryColor.withOpacity(0.5)),
          const SizedBox(height: 16),
          const Text('محتوى لوحة القيادة', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          const Text('تم بناء الهيكلة بنجاح. يمكنك إضافة الشاشات هنا.', style: TextStyle(color: Colors.grey)),
        ],
      ),
    );
  }

  Widget _buildDrawer(BuildContext context) {
    return Drawer(
      backgroundColor: Colors.white,
      child: Column(
        children: [
          DrawerHeader(
            decoration: const BoxDecoration(color: Color(0xFF1E3A8A)),
            child: SizedBox(
              width: double.infinity,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  const CircleAvatar(
                    backgroundColor: Colors.white,
                    radius: 30,
                    child: Icon(LucideIcons.graduationCap, size: 30, color: Color(0xFF1E3A8A)),
                  ),
                  const SizedBox(height: 12),
                  const Text('Elite Univ', style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold)),
                  Text('سوبر أدمن', style: TextStyle(color: Colors.white.withOpacity(0.8), fontSize: 14)),
                ],
              ),
            ),
          ),
          ListTile(
            leading: const Icon(LucideIcons.layoutDashboard),
            title: const Text('الرئيسية', style: TextStyle(fontWeight: FontWeight.bold)),
            selected: true,
            selectedColor: Theme.of(context).primaryColor,
            onTap: () {},
          ),
          ListTile(
            leading: const Icon(LucideIcons.users),
            title: const Text('إدارة المستخدمين', style: TextStyle(fontWeight: FontWeight.bold)),
            onTap: () {},
          ),
          ListTile(
            leading: const Icon(LucideIcons.bookOpen),
            title: const Text('المحتوى الأكاديمي', style: TextStyle(fontWeight: FontWeight.bold)),
            onTap: () {},
          ),
          ListTile(
            leading: const Icon(LucideIcons.fileText),
            title: const Text('العقود والتقارير', style: TextStyle(fontWeight: FontWeight.bold)),
            onTap: () {},
          ),
          const Spacer(),
          const Divider(),
          ListTile(
            leading: const Icon(LucideIcons.logOut, color: Colors.red),
            title: const Text('تسجيل الخروج', style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold)),
            onTap: () => context.go('/login'),
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }
}
